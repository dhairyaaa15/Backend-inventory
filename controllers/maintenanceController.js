// controllers/maintenanceController.js

const Maintenance = require('../models/Maintenance');

// Add a new maintenance record
exports.addMaintenance = async (req, res) => {
  const { service_type, date_of_service, cost, item_id } = req.body;
  try {
    const maintenance = new Maintenance({
      service_type,
      date_of_service,
      cost,
      item_id
    });
    await maintenance.save();
    res.status(201).json(maintenance);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// Get all maintenance records for a specific item
exports.getMaintenanceRecords = async (req, res) => {
  try {
    const maintenanceRecords = await Maintenance.find({ item_id: req.params.itemId });
    res.json(maintenanceRecords);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// Update a maintenance record
exports.updateMaintenance = async (req, res) => {
  const { service_type, date_of_service, cost } = req.body;
  try {
    const maintenance = await Maintenance.findByIdAndUpdate(
      req.params.maintenanceId,
      { service_type, date_of_service, cost },
      { new: true }
    );
    if (!maintenance) return res.status(404).json({ msg: 'Maintenance record not found' });
    res.json(maintenance);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// Delete a maintenance record
exports.deleteMaintenance = async (req, res) => {
  try {
    const maintenance = await Maintenance.findByIdAndDelete(req.params.maintenanceId);
    if (!maintenance) return res.status(404).json({ msg: 'Maintenance record not found' });
    res.json({ msg: 'Maintenance record deleted' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};