const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, sparse: true },
    passwordHash: { type: String, sparse: true },
    email: { type: String, required: true, unique: true },
    role: {
        type: String,
        enum: ['Admin', 'Organization', 'Food Bank Staff'],
        required: true
    },
    organizationcode: {
        type: String,
        ref: 'Organization',
        sparse: true 
    },
    isVerified: { type: Boolean, default: false },
    verificationToken: String,
    googleId: { type: String, unique: true, sparse: true },
    createdAt: { type: Date, default: Date.now },
    lastLogin: { type: Date }
});

module.exports = mongoose.models.User || mongoose.model('User', userSchema);
