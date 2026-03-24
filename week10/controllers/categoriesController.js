const pool = require("../db");

// GET /categories
exports.getAllCategories = async (req, res, next) => {
  try {
    const [rows] = await pool.query("SELECT * FROM categories");
    res.json(rows);
  } catch (err) {
    next(err);
  }
};

// GET /categories/:id
exports.getCategoryById = async (req, res, next) => {
  const id = parseInt(req.params.id);

  try {
    const [rows] = await pool.query(
      "SELECT * FROM categories WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      const error = new Error("Category not found");
      error.status = 404;
      error.code = "CATEGORY_NOT_FOUND";
      return next(error);
    }

    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
};

// POST /categories
exports.createCategory = async (req, res, next) => {
  const { name } = req.body;

  if (!name || typeof name !== "string") {
    const error = new Error("Name is required and must be a string");
    error.status = 400;
    error.code = "INVALID_INPUT";
    return next(error);
  }

  try {
    // Check for duplicate name
    const [existing] = await pool.query(
      "SELECT * FROM categories WHERE LOWER(name) = LOWER(?)",
      [name]
    );

    if (existing.length > 0) {
      const error = new Error("Category name already exists");
      error.status = 409;
      error.code = "CATEGORY_CONFLICT";
      return next(error);
    }

    const [result] = await pool.query(
      "INSERT INTO categories (name) VALUES (?)",
      [name]
    );

    res.status(201).json({
      id: result.insertId,
      name
    });
  } catch (err) {
    next(err);
  }
};

// PATCH /categories/:id
exports.updateCategory = async (req, res, next) => {
  const id = parseInt(req.params.id);
  const { name } = req.body;

  try {
    const [rows] = await pool.query(
      "SELECT * FROM categories WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      const error = new Error("Category not found");
      error.status = 404;
      error.code = "CATEGORY_NOT_FOUND";
      return next(error);
    }

    if (name !== undefined) {
      if (typeof name !== "string") {
        const error = new Error("Name must be a string");
        error.status = 400;
        error.code = "INVALID_INPUT";
        return next(error);
      }

      const [existing] = await pool.query(
        "SELECT * FROM categories WHERE LOWER(name) = LOWER(?) AND id != ?",
        [name, id]
      );

      if (existing.length > 0) {
        const error = new Error("Category name already exists");
        error.status = 409;
        error.code = "CATEGORY_CONFLICT";
        return next(error);
      }

      await pool.query(
        "UPDATE categories SET name = ? WHERE id = ?",
        [name, id]
      );
    }

    const [updated] = await pool.query(
      "SELECT * FROM categories WHERE id = ?",
      [id]
    );

    res.json(updated[0]);
  } catch (err) {
    next(err);
  }
};

// DELETE /categories/:id
exports.deleteCategory = async (req, res, next) => {
  const id = parseInt(req.params.id);

  try {
    const [result] = await pool.query(
      "DELETE FROM categories WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      const error = new Error("Category not found");
      error.status = 404;
      error.code = "CATEGORY_NOT_FOUND";
      return next(error);
    }

    res.json({ message: "Category deleted" });
  } catch (err) {
    next(err);
  }
};

// GET /categories/:categoryid/posts
exports.getPostsByCategory = async (req, res, next) => {
  const categoryId = parseInt(req.params.categoryid);

  try {
    const [category] = await pool.query(
      "SELECT * FROM categories WHERE id = ?",
      [categoryId]
    );

    if (category.length === 0) {
      const error = new Error("Category not found");
      error.status = 404;
      error.code = "CATEGORY_NOT_FOUND";
      return next(error);
    }

    const [posts] = await pool.query(
      "SELECT * FROM posts WHERE category_id = ?",
      [categoryId]
    );

    res.json(posts);
  } catch (err) {
    next(err);
  }
};