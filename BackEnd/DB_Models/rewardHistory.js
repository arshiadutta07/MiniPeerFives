const mongoose = require('mongoose');

const rewardHistorySchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    default: Date.now,
    required: true
  },
  points: {
    type: Number,
    required: true
  },
  givenBy: {
    type: String,
    required: true
  },
  givenTo: {
    type: String,
    required: true
  }
});

const RewardHistory = mongoose.model('RewardHistory', rewardHistorySchema);

module.exports = RewardHistory;
