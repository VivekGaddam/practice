const mongoose = require('mongoose');

const foodItemSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    unitOfMeasurement: { type: String, required: true } // e.g., 'kg', 'liters', 'units'
});

module.exports = mongoose.model('FoodItem', foodItemSchema);
