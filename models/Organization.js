const mongoose = require('mongoose');

const organizationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  code: { type: String, unique: true },
  isVerified: { type: Boolean, default: false },
  verificationToken: String
});

module.exports = mongoose.model('Organization', organizationSchema);
