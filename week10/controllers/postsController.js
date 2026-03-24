let posts = [];
let currentId = 1;

// GET /posts with pagination
exports.getAllPosts = (req, res) => {
  let { page, limit } = req.query;

  // Convert to numbers, defaults
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 10;

  if (page < 1) page = 1;
  if (limit < 1) limit = 10;

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  const paginatedPosts = posts.slice(startIndex, endIndex);

  res.json({
    data: paginatedPosts,
    meta: {
      page,
      limit,
      total: posts.length
    }
  });
};

// GET /posts/:id
exports.getPostById = (req, res, next) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));

  if (!post) {
    const error = new Error("Post not found");
    error.status = 404;
    error.code = "POST_NOT_FOUND";
    return next(error);
  }

  res.json(post);
};

// POST /posts
exports.createPost = (req, res, next) => {
  const { title, content, categoryId } = req.body;

  // 🔴 400 — missing or invalid title
  if (!title || typeof title !== "string") {
    const error = new Error("Title is required and must be a string");
    error.status = 400;
    error.code = "INVALID_INPUT";
    return next(error);
  }

  // 🔴 400 — missing or invalid content
  if (!content || typeof content !== "string") {
    const error = new Error("Content is required and must be a string");
    error.status = 400;
    error.code = "INVALID_INPUT";
    return next(error);
  }

  const newPost = {
    id: currentId++,
    title,
    content,
    categoryId: categoryId || null,
    mediaFiles: []
  };

  posts.push(newPost);
  res.status(201).json(newPost);
};

// PATCH /posts/:id
exports.updatePost = (req, res, next) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));

  if (!post) {
    const error = new Error("Post not found");
    error.status = 404;
    error.code = "POST_NOT_FOUND";
    return next(error);
  }

  const { title, content } = req.body;

  // 🔴 400 — invalid types
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

  if (title !== undefined) post.title = title;
  if (content !== undefined) post.content = content;

  res.json(post);
};

// DELETE /posts/:id
exports.deletePost = (req, res, next) => {
  const index = posts.findIndex(p => p.id === parseInt(req.params.id));

  if (index === -1) {
    const error = new Error("Post not found");
    error.status = 404;
    error.code = "POST_NOT_FOUND";
    return next(error);
  }

  posts.splice(index, 1);
  res.json({ message: "Post deleted" });
};

// GET /posts/:postid/media-files
exports.getPostMediaFiles = (req, res, next) => {
  const post = posts.find(p => p.id === parseInt(req.params.postid));

  if (!post) {
    const error = new Error("Post not found");
    error.status = 404;
    error.code = "POST_NOT_FOUND";
    return next(error);
  }

  res.json(post.mediaFiles);
};

// Export posts array if needed for other controllers (e.g., categories)
exports.posts = posts;

