const express = require('express');
const router = express.Router();
const maintenanceController = require('../controllers/maintenanceController');
const authMiddleware = require('../middleware/authMiddleware');

// Protected routes
router.post('/', authMiddleware, maintenanceController.addMaintenance);
router.get('/:itemId', authMiddleware, maintenanceController.getMaintenanceRecords);
router.put('/:maintenanceId', authMiddleware, maintenanceController.updateMaintenance);
router.delete('/:maintenanceId', authMiddleware, maintenanceController.deleteMaintenance);

module.exports = router;