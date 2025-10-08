const User = require('../model/user');
const Transaction = require('../model/transaction');
const Settings = require('../model/settings');


const wallets = async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) settings = await Settings.create({});
    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const getBalance = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({ balance: user.balance });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};


const deposit = async (req, res) => {
  const { amount } = req.body;
  if (amount <= 0) return res.status(400).json({ message: 'Amount must be greater than 0' });

  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.balance += amount;
    await user.save();

    const transactions = new Transaction({
        user: req.user.id,
        type: 'deposit',
        amount,
        balanceAfter: user.balance,
    });
    await transactions.save();

//     const adminEmail = process.env.ADMIN_EMAIL;
//     await sendEmail(
//       adminEmail,
//       `New Deposit Alert — ${user.username}`,
//       `
// A new deposit was made by ${user.username} (${user.email}).

// 📦 Amount: $${amount}
// 💰 New Balance: $${user.balance}
// 🕒 Date: ${new Date().toLocaleString()}

// — RetroMiner Automated Notification
//       `
//     );

    res.json({ message: 'Deposit successful', balance: user.balance });
  } catch (err) {
    console.error('Deposit error:', err.response?.data || err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Withdraw (decrease balance)
const withdraw = async (req, res) => {
  const { amount } = req.body;
  if (amount <= 0) return res.status(400).json({ message: 'Amount must be greater than 0' });

  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user.balance < amount) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    user.balance -= amount;
    await user.save();

    res.json({ message: 'Withdrawal successful', balance: user.balance });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { getBalance, deposit, withdraw, getTransactions, wallets };