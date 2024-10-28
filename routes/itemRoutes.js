const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
const authMiddleware = require('../middleware/authMiddleware');

// Protected routes
router.post('/', authMiddleware, itemController.addItem);
router.get('/', authMiddleware, itemController.getItems);
router.put('/:itemId', authMiddleware, itemController.updateItem);
router.delete('/:itemId', authMiddleware, itemController.deleteItem);

module.exports = router;