const express = require('express');
const router = express.Router();
const Invoice = require('../models/Invoice');
const authorizeRoles = require('../middleware/roleMiddleware');

// Create invoice (Sales/Admin/Manager/Accountant)
router.post('/', authorizeRoles('admin', 'manager', 'sales', 'accountant'), async (req, res) => {
  const invoice = new Invoice(req.body);
  await invoice.save();
  res.status(201).json(invoice);
});

// List all invoices (Admin/Manager/Accountant)
router.get('/', authorizeRoles('admin', 'manager', 'accountant'), async (req, res) => {
  const invoices = await Invoice.find({}).populate('salesRep', 'name');
  res.json(invoices);
});

// List my invoices (Sales Rep)
router.get('/mine', authorizeRoles('sales'), async (req, res) => {
  const invoices = await Invoice.find({ salesRep: req.user._id });
  res.json(invoices);
});

// Get invoice by ID (all roles)
router.get('/:id', async (req, res) => {
  const invoice = await Invoice.findById(req.params.id).populate('salesRep', 'name');
  res.json(invoice);
});

module.exports = router;
