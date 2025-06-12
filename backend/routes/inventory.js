const express = require('express');
const router = express.Router();
const InventoryItem = require('../models/InventoryItem');
const authorizeRoles = require('../middleware/roleMiddleware');

// List all inventory (all roles)
router.get('/', async (req, res) => {
  const items = await InventoryItem.find();
  res.json(items);
});

// Add item (Admin/Manager)
router.post('/', authorizeRoles('admin', 'manager'), async (req, res) => {
  const item = new InventoryItem(req.body);
  await item.save();
  res.status(201).json(item);
});

// Update item (Admin/Manager)
router.put('/:id', authorizeRoles('admin', 'manager'), async (req, res) => {
  const item = await InventoryItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(item);
});

// Delete item (Admin only)
router.delete('/:id', authorizeRoles('admin'), async (req, res) => {
  await InventoryItem.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

module.exports = router;
