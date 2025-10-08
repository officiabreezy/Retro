const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  usdWallet: { type: String, default: '' },
  btcWallet: { type: String, default: '' },
  ethWallet: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Settings', settingsSchema);
