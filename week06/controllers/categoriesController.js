let categories = [];
let currentCategoryId = 1;

// GET /categories
exports.getAllCategories = (req, res) => {
  res.json(categories);
};

// GET /categories/:id
exports.getCategoryById = (req, res, next) => {
  const id = parseInt(req.params.id);
  const category = categories.find(c => c.id === id);

  if (!category) {
    const error = new Error("Category not found");
    error.status = 404;
    error.code = "CATEGORY_NOT_FOUND";
    return next(error);
  }

  res.json(category);
};

// POST /categories
exports.createCategory = (req, res, next) => {
  const { name } = req.body;

  if (!name || typeof name !== "string") {
    const error = new Error("Name is required and must be a string");
    error.status = 400;
    error.code = "INVALID_INPUT";
    return next(error);
  }

  const exists = categories.find(
    c => c.name.toLowerCase() === name.toLowerCase()
  );

  if (exists) {
    const error = new Error("Category name already exists");
    error.status = 409;
    error.code = "CATEGORY_CONFLICT";
    return next(error);
  }

  const newCategory = {
    id: currentCategoryId++,
    name
  };

  categories.push(newCategory);

  res.status(201).json(newCategory);
};

// PATCH /categories/:id
exports.updateCategory = (req, res, next) => {
  const id = parseInt(req.params.id);
  const category = categories.find(c => c.id === id);

  if (!category) {
    const error = new Error("Category not found");
    error.status = 404;
    error.code = "CATEGORY_NOT_FOUND";
    return next(error);
  }

  if (req.body.name !== undefined && typeof req.body.name !== "string") {
    const error = new Error("Name must be a string");
    error.status = 400;
    error.code = "INVALID_INPUT";
    return next(error);
  }

  if (req.body.name !== undefined) {
    const exists = categories.find(
      c =>
        c.name.toLowerCase() === req.body.name.toLowerCase() &&
        c.id !== category.id
    );

    if (exists) {
      const error = new Error("Category name already exists");
      error.status = 409;
      error.code = "CATEGORY_CONFLICT";
      return next(error);
    }

    category.name = req.body.name;
  }

  res.json(category);
};

// DELETE /categories/:id
exports.deleteCategory = (req, res, next) => {
  const id = parseInt(req.params.id);
  const index = categories.findIndex(c => c.id === id);

  if (index === -1) {
    const error = new Error("Category not found");
    error.status = 404;
    error.code = "CATEGORY_NOT_FOUND";
    return next(error);
  }

  categories.splice(index, 1);

  res.json({ message: "Category deleted" });
};

// Nested: GET /categories/:categoryid/posts
exports.getPostsByCategory = (req, res, next) => {
  const categoryId = parseInt(req.params.categoryid);

  const category = categories.find(c => c.id === categoryId);

  if (!category) {
    const error = new Error("Category not found");
    error.status = 404;
    error.code = "CATEGORY_NOT_FOUND";
    return next(error);
  }

  try {
    const postsController = require("./postsController");
    const posts = postsController.posts || [];
    const filteredPosts = posts.filter(
      p => p.categoryId === categoryId
    );

    res.json(filteredPosts);
  } catch (err) {
    res.json([]); // if postsController doesn't exist yet
  }
};
