const Profile = require('../model/profile');

// 🧾 Get the current user's profile
const getMyProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// ⚙️ Admin: Update user profile fields
const updateUserProfile = async (req, res) => {
  const { name, bonus, balance, amountInvested, profitEarned } = req.body;

  try {
    const profile = await Profile.findOne({ user: req.params.id });
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    if (name) profile.name = name;
    if (bonus !== undefined) profile.bonus = bonus;
    if (balance !== undefined) profile.balance = balance;
    if (amountInvested !== undefined) profile.amountInvested = amountInvested;
    if (profitEarned !== undefined) profile.profitEarned = profitEarned;

    await profile.save();

    res.json({
      message: 'Profile updated successfully',
      profile,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// 🗑️ Optional: Delete profile (admin or user)
const deleteProfile = async (req, res) => {
  try {
    const profile = await Profile.findOneAndDelete({ user: req.params.id });
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.json({ message: 'Profile deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = {
  getMyProfile,
  updateUserProfile,
  deleteProfile,
};
