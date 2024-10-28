const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  item_name: { type: String, required: true },
  category: { type: String, required: true },
  purchase_date: { type: Date, required: true },
  serial_number: { type: String, required: true },
  item_image: { type: String },
  customer_id: { type: Schema.Types.ObjectId, ref: 'Customer', required: true }
});

module.exports = mongoose.model('Item', itemSchema);
