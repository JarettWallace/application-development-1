const express = require("express");
const session = require("express-session");

const app = express();
const PORT = 3000;

// Parse JSON request bodies
app.use(express.json());

// Session middleware
app.use(
session({
secret: "my-secret-key",
resave: false,
saveUninitialized: false,
cookie: {
maxAge: 1000 * 60 * 30 // 30 minutes
}
})
);

// Simple hardcoded user for this assignment
const demoUser = {
email: "student@example.com",
password: "password123",
name: "Demo Student"
};

// Middleware to protect routes
function requireLogin(req, res, next) {
if (!req.session.user) {
return res.status(401).json({
error: {
code: "NOT_AUTHENTICATED",
message: "You must be logged in to access this route."
}
});
}

next();
}

// Public route
app.get("/", (req, res) => {
res.json({
message: "Welcome to the session authentication demo."
});
});

// Login route
app.post("/login", (req, res) => {
const { email, password } = req.body;

if (email === demoUser.email && password === demoUser.password) {
req.session.user = {
email: demoUser.email,
name: demoUser.name
};

return res.status(200).json({
message: "Login successful.",
user: req.session.user
});
}

return res.status(401).json({
error: {
code: "INVALID_CREDENTIALS",
message: "Email or password is incorrect."
}
});
});

// Protected route
app.get("/profile", requireLogin, (req, res) => {
res.json({
message: "You are logged in.",
user: req.session.user
});
});

// Logout route
app.post("/logout", requireLogin, (req, res) => {
req.session.destroy((err) => {
if (err) {
return res.status(500).json({
error: {
code: "LOGOUT_FAILED",
message: "Could not log out."
}
});
}

res.json({
message: "Logout successful."
});
});
});

app.listen(PORT, () => {
console.log(`Server running on http://localhost:${PORT}`);
});