const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const authMiddleware = require('../middleware/authMiddleware');

// Public routes
router.post('/register', customerController.registerCustomer);
router.post('/login', customerController.loginCustomer);

// Protected routes
router.get('/profile', authMiddleware, customerController.getCustomerProfile);

module.exports = router;