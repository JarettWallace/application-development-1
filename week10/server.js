const express = require("express");
const postsRoutes = require("./routes/postsRoutes");
const categoriesRoutes = require("./routes/categoriesRoutes");
const tasksRoutes = require("./routes/tasks");
const logger = require("./middleware/logger");

const app = express();
const PORT = 3000;

// Parse JSON bodies
app.use(express.json());

// Global logger middleware
app.use(logger);

// Routes
app.use("/posts", postsRoutes);
app.use("/categories", categoriesRoutes);
app.use("/tasks", tasksRoutes);

// 404 handler
app.use((req, res, next) => {
  const error = new Error("Route not found");
  error.status = 404;
  error.code = "ROUTE_NOT_FOUND";
  next(error);
});

// Global error handler
const errorHandler = require("./middleware/errorHandler");
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});