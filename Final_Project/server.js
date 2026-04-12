const express = require('express');
const session = require('express-session');

const app = express();

app.use(express.json());

app.use(session({
  secret: 'secretKey',
  resave: false,
  saveUninitialized: false
}));

// Routes
const authRoutes = require('./routes/authRoutes');
const itemRoutes = require('./routes/itemRoutes');

app.use('/auth', authRoutes);
app.use('/items', itemRoutes);

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});