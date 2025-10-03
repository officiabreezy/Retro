const express = require('express');
const User = require('../model/user');
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');

const router = express.Router();

// Fetch all users (admin only)
router.get('/users', protect, admin, async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
});

// Edit user balance (admin only)
router.put('/users/:id/balance', protect, admin, async (req, res) => {
  const { balance } = req.body;
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.balance = balance;
    await user.save();
    res.json({ message: 'Balance updated', user });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Delete user (admin only)
router.delete('/users/:id', protect, admin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    await user.deleteOne();
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
