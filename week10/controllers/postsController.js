const pool = require("../db");

// GET /posts with pagination
exports.getAllPosts = async (req, res, next) => {
  let { page, limit } = req.query;

  page = parseInt(page) || 1;
  limit = parseInt(limit) || 10;

  if (page < 1) page = 1;
  if (limit < 1) limit = 10;

  const offset = (page - 1) * limit;

  try {
    const [rows] = await pool.query(
      "SELECT * FROM posts LIMIT ? OFFSET ?",
      [limit, offset]
    );

    const [countResult] = await pool.query(
      "SELECT COUNT(*) AS total FROM posts"
    );

    res.json({
      data: rows,
      meta: {
        page,
        limit,
        total: countResult[0].total
      }
    });
  } catch (err) {
    next(err);
  }
};

// GET /posts/:id
exports.getPostById = async (req, res, next) => {
  const id = parseInt(req.params.id);

  try {
    const [rows] = await pool.query(
      "SELECT * FROM posts WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      const error = new Error("Post not found");
      error.status = 404;
      error.code = "POST_NOT_FOUND";
      return next(error);
    }

    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
};

// POST /posts
exports.createPost = async (req, res, next) => {
  const { title, content, categoryId } = req.body;

  if (!title || typeof title !== "string") {
    const error = new Error("Title is required and must be a string");
    error.status = 400;
    error.code = "INVALID_INPUT";
    return next(error);
  }

  if (!content || typeof content !== "string") {
    const error = new Error("Content is required and must be a string");
    error.status = 400;
    error.code = "INVALID_INPUT";
    return next(error);
  }

  try {
    const [result] = await pool.query(
      "INSERT INTO posts (title, content, category_id) VALUES (?, ?, ?)",
      [title, content, categoryId || null]
    );

    res.status(201).json({
      id: result.insertId,
      title,
      content,
      categoryId: categoryId || null
    });
  } catch (err) {
    next(err);
  }
};

// PATCH /posts/:id
exports.updatePost = async (req, res, next) => {
  const id = parseInt(req.params.id);
  const { title, content } = req.body;

  try {
    const [rows] = await pool.query(
      "SELECT * FROM posts WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      const error = new Error("Post not found");
      error.status = 404;
      error.code = "POST_NOT_FOUND";
      return next(error);
    }

    if (title !== undefined && typeof title !== "string") {
      const error = new Error("Title must be a string");
      error.status = 400;
      error.code = "INVALID_INPUT";
      return next(error);
    }

    if (content !== undefined && typeof content !== "string") {
      const error = new Error("Content must be a string");
      error.status = 400;
      error.code = "INVALID_INPUT";
      return next(error);
    }

    await pool.query(
      "UPDATE posts SET title = ?, content = ? WHERE id = ?",
      [
        title !== undefined ? title : rows[0].title,
        content !== undefined ? content : rows[0].content,
        id
      ]
    );

    const [updated] = await pool.query(
      "SELECT * FROM posts WHERE id = ?",
      [id]
    );

    res.json(updated[0]);
  } catch (err) {
    next(err);
  }
};

// DELETE /posts/:id
exports.deletePost = async (req, res, next) => {
  const id = parseInt(req.params.id);

  try {
    const [result] = await pool.query(
      "DELETE FROM posts WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      const error = new Error("Post not found");
      error.status = 404;
      error.code = "POST_NOT_FOUND";
      return next(error);
    }

    res.json({ message: "Post deleted" });
  } catch (err) {
    next(err);
  }
};

// GET /posts/:postid/media-files
exports.getPostMediaFiles = async (req, res, next) => {
  const postId = parseInt(req.params.postid);

  try {
    const [post] = await pool.query(
      "SELECT * FROM posts WHERE id = ?",
      [postId]
    );

    if (post.length === 0) {
      const error = new Error("Post not found");
      error.status = 404;
      error.code = "POST_NOT_FOUND";
      return next(error);
    }

    // If you have a media_files table
    const [media] = await pool.query(
      "SELECT * FROM media_files WHERE post_id = ?",
      [postId]
    );

    res.json(media);
  } catch (err) {
    next(err);
  }
};
