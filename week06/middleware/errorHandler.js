const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;

  res.status(status).json({
    error: {
      code: err.code || "INTERNAL_ERROR",
      message: err.message || "Something went wrong"
    }
  });
};

module.exports = errorHandler;
