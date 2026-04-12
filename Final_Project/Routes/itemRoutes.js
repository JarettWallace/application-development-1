const express = require('express');
const router = express.Router();

const itemController = require('../Controllers/itemController');
const { isAuthenticated } = require('../Middleware/authMiddleware');

router.get('/', isAuthenticated, itemController.getItems);
router.post('/', isAuthenticated, itemController.createItem);
router.put('/:id', isAuthenticated, itemController.updateItem);
router.delete('/:id', isAuthenticated, itemController.deleteItem);

module.exports = router;