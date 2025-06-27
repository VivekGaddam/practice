const express = require('express');
const router = express.Router();
const { registerOrg, verifyOrgEmail } = require('../controllers/orgController');

router.post('/register', registerOrg);
router.get('/verify/:token', verifyOrgEmail);

module.exports = router;
