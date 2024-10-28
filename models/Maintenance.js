const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const maintenanceSchema = new Schema({
  service_type: { type: String, required: true },
  date_of_service: { type: Date, required: true },
  cost: { type: Number, required: true },
  item_id: { type: Schema.Types.ObjectId, ref: 'Item', required: true }
});

module.exports = mongoose.model('Maintenance', maintenanceSchema);