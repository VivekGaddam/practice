const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const isAdmin = require('../middleware/roleMiddleware');

router.get('/dashboard', auth, isAdmin('admin'), (req, res) => {
  res.json({ message: 'Welcome Admin 👑', stats: { users: 100, reports: 50 } });
});

module.exports = router;