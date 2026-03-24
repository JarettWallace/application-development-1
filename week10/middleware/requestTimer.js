// requestTimer.js

function requestTimer(req, res, next) {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[${req.method} ${req.originalUrl}] completed in ${duration}ms`);
  });

  next();
}

module.exports = requestTimer;