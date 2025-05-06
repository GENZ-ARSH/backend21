const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    sessionId: { type: String, required: true },
    userType: { type: String, enum: ['user', 'admin'], required: true },
    expiresAt: { type: Date, required: true }
});

module.exports = mongoose.model('Session', sessionSchema);
