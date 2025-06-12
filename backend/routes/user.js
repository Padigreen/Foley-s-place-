const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { authenticateJWT } = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');

// Register (Admin only)
router.post('/register', authenticateJWT, authorizeRoles('admin'), async (req, res) => {
  const { name, email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = new User({ name, email, password: hashedPassword, role });
    await user.save();
    res.status(201).json({ message: 'User created', user: { name, email, role } });
  } catch (err) {
    res.status(400).json({ message: 'User registration failed', error: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });
  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
});

// List users (Admin/Manager)
router.get('/', authenticateJWT, authorizeRoles('admin', 'manager'), async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
});

module.exports = router;
