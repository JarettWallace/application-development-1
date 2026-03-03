// middleware/apiKeyMiddleware.js

module.exports = function apiKeyMiddleware(req, res, next) {
    const protectedMethods = ["POST", "PATCH", "DELETE"];

    if (!protectedMethods.includes(req.method)) {
        return next(); // Skip validation for GET
    }

    const apiKey = req.header("x-api-key");

    if (!apiKey || apiKey !== "12345") {
        return res.status(401).json({
            message: "Unauthorized: Invalid or missing API key"
        });
    }

    next();
};