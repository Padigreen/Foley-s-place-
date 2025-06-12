const express = require('express');
const router = express.Router();
const Invoice = require('../models/Invoice');
const authorizeRoles = require('../middleware/roleMiddleware');

// Sales Rep performance (for self)
router.get('/performance', authorizeRoles('sales'), async (req, res) => {
  const invoices = await Invoice.find({ salesRep: req.user._id });
  const total = invoices.reduce((sum, inv) => sum + (inv.total || 0), 0);
  res.json({ totalSales: total, invoiceCount: invoices.length });
});

module.exports = router;
