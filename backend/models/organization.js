const mongoose = require('mongoose');

const organizationSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    programs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Program' }],
    type: {
        type: String,
        required: true
    },
    website: { type: String },
    contact: {
        person: { type: String },
        email: { type: String, sparse: true },
        phone: { type: String }
    },
    address: {
        street: { type: String },
        city: { type: String },
        state: { type: String },
        zipCode: { type: String }
    },
    organizationCode: { type: String, required: true, unique: true },
    approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    approvedAt: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('Organization', organizationSchema);

