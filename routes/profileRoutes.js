const express = require('express');
const { getMyProfile, updateUserProfile, deleteProfile } = require('../controllers/profileController');
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');

const router = express.Router();

// 🧍‍♂️ Get logged-in user’s profile
router.get('/me', protect, getMyProfile);

// 🛠️ Admin edit profile
router.put('/:id', protect, admin, updateUserProfile);

// 🗑️ Admin delete profile (optional)
router.delete('/:id', protect, admin, deleteProfile);

module.exports = router;
