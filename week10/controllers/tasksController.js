const pool = require("../db");

// GET /tasks
exports.getAllTasks = async (req, res, next) => {
  try {
    const [rows] = await pool.query("SELECT * FROM tasks");
    res.json(rows);
  } catch (err) {
    next(err);
  }
};

// GET /tasks/:id
exports.getTaskById = async (req, res, next) => {
  const id = parseInt(req.params.id);

  try {
    const [rows] = await pool.query(
      "SELECT * FROM tasks WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      const error = new Error("Task not found");
      error.status = 404;
      error.code = "TASK_NOT_FOUND";
      return next(error);
    }

    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
};

// POST /tasks
exports.createTask = async (req, res, next) => {
  const { title, status, project_id } = req.body;

  // Validation
  if (!title || typeof title !== "string") {
    const error = new Error("Title is required and must be a string");
    error.status = 400;
    error.code = "INVALID_INPUT";
    return next(error);
  }

  if (!status || typeof status !== "string") {
    const error = new Error("Status is required and must be a string");
    error.status = 400;
    error.code = "INVALID_INPUT";
    return next(error);
  }

  try {
    const [result] = await pool.query(
      "INSERT INTO tasks (title, status, project_id) VALUES (?, ?, ?)",
      [title, status, project_id || null]
    );

    res.status(201).json({
      id: result.insertId,
      title,
      status,
      project_id: project_id || null
    });
  } catch (err) {
    next(err);
  }
};

// PATCH /tasks/:id
exports.updateTask = async (req, res, next) => {
  const id = parseInt(req.params.id);
  const { title, status } = req.body;

  try {
    const [rows] = await pool.query(
      "SELECT * FROM tasks WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      const error = new Error("Task not found");
      error.status = 404;
      error.code = "TASK_NOT_FOUND";
      return next(error);
    }

    if (title !== undefined && typeof title !== "string") {
      const error = new Error("Title must be a string");
      error.status = 400;
      error.code = "INVALID_INPUT";
      return next(error);
    }

    if (status !== undefined && typeof status !== "string") {
      const error = new Error("Status must be a string");
      error.status = 400;
      error.code = "INVALID_INPUT";
      return next(error);
    }

    await pool.query(
      "UPDATE tasks SET title = ?, status = ? WHERE id = ?",
      [
        title !== undefined ? title : rows[0].title,
        status !== undefined ? status : rows[0].status,
        id
      ]
    );

    const [updated] = await pool.query(
      "SELECT * FROM tasks WHERE id = ?",
      [id]
    );

    res.json(updated[0]);
  } catch (err) {
    next(err);
  }
};

// DELETE /tasks/:id
exports.deleteTask = async (req, res, next) => {
  const id = parseInt(req.params.id);

  try {
    const [result] = await pool.query(
      "DELETE FROM tasks WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      const error = new Error("Task not found");
      error.status = 404;
      error.code = "TASK_NOT_FOUND";
      return next(error);
    }

    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    next(err);
  }
};