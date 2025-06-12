const mongoose = require('mongoose');
const InvoiceSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  customerName: String,
  items: [{
    description: String,
    qty: Number,
    unit: String,
    price: Number,
    amount: Number
  }],
  total: Number,
  salesRep: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  terms: String
});
module.exports = mongoose.model('Invoice', InvoiceSchema);
