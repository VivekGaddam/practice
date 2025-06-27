const Organization = require('../models/Organization');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');

const generateOrgCode = (name) => {
  const prefix = name.slice(0, 5).toLowerCase();
  const suffix = Math.floor(1000 + Math.random() * 9000);
  return prefix + suffix;
};

exports.registerOrg = async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const verificationToken = crypto.randomBytes(32).toString('hex');

  try {
    const org = new Organization({ name, email, password: hashedPassword, verificationToken });
    await org.save();

    const link = `${process.env.CLIENT_URL}/api/org/verify/${verificationToken}`;
    await sendEmail(email, 'Verify your Organization Email', `<a href="${link}">Click here to verify</a>`);

    res.status(201).json({ message: 'Organization registered. Please verify your email.' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to register organization' });
  }
};

exports.verifyOrgEmail = async (req, res) => {
  try {
    const org = await Organization.findOne({ verificationToken: req.params.token });
    if (!org) return res.status(400).json({ message: 'Invalid token' });

    org.isVerified = true;
    org.verificationToken = undefined;
    org.code = generateOrgCode(org.name);
    await org.save();

    await sendEmail(org.email, 'Your Organization Code', `Your organization code is: <strong>${org.code}</strong>`);

    res.send('Organization email verified. Code sent via email.');
  } catch (err) {
    res.status(500).json({ message: 'Verification failed' });
  }
};
