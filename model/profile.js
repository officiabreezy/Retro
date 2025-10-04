const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  name: { type: String },
  bonus: { type: Number, default: 100 },
  balance: { type: Number, default: 100 }, // start same as bonus
  amountInvested: { type: Number, default: 0 },
  profitEarned: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Profile', ProfileSchema);
