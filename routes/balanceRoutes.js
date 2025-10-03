const express = require('express');
const { getBalance, deposit, withdraw, getTransactions } = require('../controllers/balanceController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', protect, getBalance);
router.post('/deposit', protect, deposit);
router.post('/withdraw', protect, withdraw);
router.get('/transactions', protect, getTransactions);

module.exports = router;
