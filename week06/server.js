const express = require("express");
const postsRoutes = require("./routes/postsRoutes");
const categoriesRoutes = require("./routes/categoriesRoutes");
const logger = require("./middleware/logger");

const app = express();
const PORT = 3000;

// 1️ JSON parsing
app.use(express.json());

// 2 Global logger
app.use(logger);

// Routes
app.use("/posts", postsRoutes);
app.use("/categories", categoriesRoutes);

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

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
