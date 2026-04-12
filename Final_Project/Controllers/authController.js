const db = require('../db');

exports.login = (req, res, next) => {
  const { username, password } = req.body;

  db.query(
    'SELECT * FROM users WHERE username = ? AND password = ?',
    [username, password],
    (err, results) => {
      if (err) return next(err);

      if (results.length === 0) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      req.session.user = results[0];
      res.json({ message: 'Login successful' });
    }
  );
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.json({ message: 'Logged out' });
};