const express = require('express');
const router = express.Router();
const {
  register,
  verifyEmail,
  login,
  forgotPassword,
  resetPassword,
  getMe,
  changePassword,
} = require('../controllers/authController');

const auth = require('../middleware/authMiddleware');

router.post('/register', register);
router.get('/verify/:token', verifyEmail);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);
router.get('/me', auth, getMe);
router.post('/change-password', auth, changePassword);

module.exports = router;
