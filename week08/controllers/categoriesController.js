let categories = [];
let currentCategoryId = 1;

/* ================== Helpers ================== */

const createError = (message, status, code) => {
  const error = new Error(message);
  error.status = status;
  error.code = code;
  return error;
};

const getCategoryOrThrow = (id) => {
  const category = categories.find(c => c.id === id);
  if (!category) {
    throw createError("Category not found", 404, "CATEGORY_NOT_FOUND");
  }
  return category;
};

const validateName = (name, required = false) => {
  if (required && (name === undefined || name === null)) {
    throw createError(
      "Name is required and must be a string",
      400,
      "INVALID_INPUT"
    );
  }

  if (name !== undefined) {
    if (typeof name !== "string" || !name.trim()) {
      throw createError(
        "Name must be a non-empty string",
        400,
        "INVALID_INPUT"
      );
    }
  }

  return name?.trim();
};

const ensureUniqueName = (name, excludeId = null) => {
  const exists = categories.find(
    c =>
      c.name.toLowerCase() === name.toLowerCase() &&
      c.id !== excludeId
  );

  if (exists) {
    throw createError(
      "Category name already exists",
      409,
      "CATEGORY_CONFLICT"
    );
  }
};

/* ================== Controllers ================== */

// GET /categories
exports.getAllCategories = (req, res) => {
  res.json(categories);
};

// GET /categories/:id
exports.getCategoryById = (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const category = getCategoryOrThrow(id);
    res.json(category);
  } catch (err) {
    next(err);
  }
};

// POST /categories
exports.createCategory = (req, res, next) => {
  try {
    const name = validateName(req.body.name, true);
    ensureUniqueName(name);

    const newCategory = {
      id: currentCategoryId++,
      name
    };

    categories.push(newCategory);
    res.status(201).json(newCategory);
  } catch (err) {
    next(err);
  }
};

// PATCH /categories/:id
exports.updateCategory = (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const category = getCategoryOrThrow(id);

    const name = validateName(req.body.name);

    if (name !== undefined) {
      ensureUniqueName(name, category.id);
      category.name = name;
    }

    res.json(category);
  } catch (err) {
    next(err);
  }
};

// DELETE /categories/:id
exports.deleteCategory = (req, res, next) => {
  try {
    const id = Number(req.params.id);
    getCategoryOrThrow(id);

    categories = categories.filter(c => c.id !== id);

    res.json({ message: "Category deleted" });
  } catch (err) {
    next(err);
  }
};

// GET /categories/:categoryid/posts
exports.getPostsByCategory = (req, res, next) => {
  try {
    const categoryId = Number(req.params.categoryid);
    getCategoryOrThrow(categoryId);

    let posts = [];

    try {
      const postsController = require("./postsController");
      posts = postsController.posts || [];
    } catch {
      return res.json([]);
    }

    res.json(posts.filter(p => p.categoryId === categoryId));
  } catch (err) {
    next(err);
  }
};
