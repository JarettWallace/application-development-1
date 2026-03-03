// middleware/logger.js

const logger = (req, res, next) => {
  const start = Date.now();
  const timestamp = new Date().toISOString();

  console.log(`[${timestamp}] ${req.method} ${req.originalUrl} - started`);

  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(
      `[${req.method} ${req.originalUrl}] completed in ${duration}ms`
    );
  });

  next();
};

module.exports = logger;
