const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  items: [{ type: Schema.Types.ObjectId, ref: 'Item' }]
});

module.exports = mongoose.model('Customer', customerSchema);