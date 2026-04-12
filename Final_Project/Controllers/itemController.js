const db = require('../db');

exports.getItems = (req, res, next) => {
  db.query(
    'SELECT * FROM items WHERE user_id = ?',
    [req.session.user.id],
    (err, results) => {
      if (err) return next(err);
      res.json(results);
    }
  );
};

exports.createItem = (req, res, next) => {
  const { name, quantity } = req.body;

  db.query(
    'INSERT INTO items (name, quantity, user_id) VALUES (?, ?, ?)',
    [name, quantity, req.session.user.id],
    (err) => {
      if (err) return next(err);
      res.status(201).json({ message: 'Item created' });
    }
  );
};

exports.updateItem = (req, res, next) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  db.query(
    'UPDATE items SET name=?, quantity=? WHERE id=? AND user_id=?',
    [name, quantity, id, req.session.user.id],
    (err, result) => {
      if (err) return next(err);

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Item not found' });
      }

      res.json({ message: 'Item updated' });
    }
  );
};

exports.deleteItem = (req, res, next) => {
  const { id } = req.params;

  db.query(
    'DELETE FROM items WHERE id=? AND user_id=?',
    [id, req.session.user.id],
    (err, result) => {
      if (err) return next(err);

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Item not found' });
      }

      res.json({ message: 'Item deleted' });
    }
  );
};