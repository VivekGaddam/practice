const mongoose = require('mongoose');

const distributionSchema = new mongoose.Schema({
    dateOfDonation: { type: Date, required: true },

    numberOfPeopleImpacted: { type: Number, required: true, min: 0 },

    ageGroupMostImpacted: {
        type: String,
        enum: ['children', 'women', 'seniorCitizens', 'differentlyAbled', 'otherAdults'],
        required: true
    },

    foodQuantityDonated: { type: Number, min: 0, default: 0 },
    dressesDonated: { type: Number, min: 0, default: 0 },

    placeOfDonation: { type: String, required: true },

    organizationCode: { type: String, required: true }, 

    recordedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    lastModifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    lastModifiedDate: { type: Date },
    adminNotes: { type: String }
});

module.exports = mongoose.model('Distribution', distributionSchema);
