const mongoose = require('mongoose');

const blacklistTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
        expires: 86400, // TTL for 24 hours in seconds
    },
});

const BlacklistToken = mongoose.model('BlacklistToken', blacklistTokenSchema);
module.exports = BlacklistToken;
