const express = require('express');
const router = express.Router();
const Invoice = require('../models/Invoice');
const authorizeRoles = require('../middleware/roleMiddleware');

// Simple sales performance report by salesRep (Admin/Manager)
router.get('/sales-reps', authorizeRoles('admin', 'manager'), async (req, res) => {
  const pipeline = [
    { $group: { _id: "$salesRep", totalSales: { $sum: "$total" }, numInvoices: { $sum: 1 } } },
    { $sort: { totalSales: -1 } }
  ];
  const stats = await Invoice.aggregate(pipeline);
  res.json(stats);
});

// Invoice summary (Admin/Manager/Accountant)
router.get('/summary', authorizeRoles('admin', 'manager', 'accountant'), async (req, res) => {
  const totalInvoices = await Invoice.countDocuments();
  const totalAmount = await Invoice.aggregate([{ $group: { _id: null, total: { $sum: "$total" } } }]);
  res.json({ totalInvoices, totalAmount: totalAmount[0]?.total || 0 });
});

module.exports = router;
