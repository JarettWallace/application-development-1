const express = require('express');
const router = express.Router();

const itemController = require('../controllers/itemController');
const { isAuthenticated, isAdmin } = require('../middleware/authMiddleware');

// =========================
// MAIN CRUD ROUTES
// =========================

// GET all items (user-specific)
router.get('/', isAuthenticated, itemController.getItems);

// CREATE item
router.post('/', isAuthenticated, itemController.createItem);

// UPDATE item
router.put('/:id', isAuthenticated, itemController.updateItem);

// DELETE item
router.delete('/:id', isAuthenticated, itemController.deleteItem);


// =========================
// ADMIN-ONLY ROUTE (FOR 403 TEST)
// =========================

router.get('/admin-only', isAuthenticated, isAdmin, (req, res) => {
  res.json({ message: 'Admin access granted' });
});

module.exports = router;