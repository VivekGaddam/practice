const mongoose = require('mongoose');

const programSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    organizations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Organization' }],
    description: { type: String },
    target_beneficiaries: { type: [String] }, 
    status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' }
});

module.exports = mongoose.model('Program', programSchema);
