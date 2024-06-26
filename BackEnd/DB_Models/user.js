const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true, 
        unique: true
    },
    P5Balance: { 
        type: Number, 
        default: 100
    },
    RewardBalance: { 
        type: Number, 
        default: 0 
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
