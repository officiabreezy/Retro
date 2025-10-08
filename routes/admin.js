const express = require('express');
const User = require('../model/user');
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');
const Profile = require('../model/profile');
const Settings = require('../model/settings');

const router = express.Router();

// Fetch all users (admin only)
router.get('/users', protect, admin, async (req, res) => {
  try {
  const users = await User.find().select('-password').lean();

  const profiles = await Profile.find().lean(); 

  const userData = users.map(user => {
      const profile = profiles.find(p => p.user.toString() === user._id.toString());
      return {
        ...user,
        bonus: profile ? profile.bonus : 0,
        balance: profile ? profile.balance : 0,
        amountInvested: profile ? profile.amountInvested : 0,
        profitEarned: profile ? profile.profitEarned : 0
      };
    });

  res.json(userData);
} catch (err) {
  res.status(500).json({ message: 'Server error', error: err.message });
}
});

// Edit user balance (admin only)
router.put('/users/:id/balance', protect, admin, async (req, res) => {
  const { balance, amountInvested, profitEarned, bonus } = req.body;

  try {
    const profile = await Profile.findOne({ user: req.params.id });
    if (!profile) return res.status(404).json({ message: 'Profile not found' });

    if (balance !== undefined) profile.balance = balance;
    if (bonus !== undefined) profile.bonus = bonus;
    if (amountInvested !== undefined) profile.amountInvested = amountInvested;
    if (profitEarned !== undefined) profile.profitEarned = profitEarned;

    await profile.save();

    res.json({ message: 'Profile updated', profile });
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

router.put('/wallets', protect, admin, async (req, res) => {
  const { usdWallet, btcWallet, ethWallet } = req.body;
  try {
    let settings = await Settings.findOne();
    if (!settings) settings = await Settings.create({});

    if (usdWallet !== undefined) settings.usdWallet = usdWallet;
    if (btcWallet !== undefined) settings.btcWallet = btcWallet;
    if (ethWallet !== undefined) settings.ethWallet = ethWallet;

    await settings.save();
    res.json({ message: 'Wallet addresses updated successfully', settings });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
