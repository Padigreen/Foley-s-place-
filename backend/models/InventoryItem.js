const mongoose = require('mongoose');
const InventoryItemSchema = new mongoose.Schema({
  name: String,
  description: String,
  quantity: Number,
  unit: String,
  price: Number,
  updatedAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('InventoryItem', InventoryItemSchema);
