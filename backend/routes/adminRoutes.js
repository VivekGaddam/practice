const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const auth = require('../middleware/auth');
const {hasRole} = require('../middleware/role');

router.post('/login', adminController.login);

router.post('/programs', auth, hasRole(['admin']), adminController.createProgram);

router.put('/programs/:id', auth, hasRole(['admin']), adminController.manageProgram);

router.delete('/programs/:id', auth, hasRole(['admin']), adminController.deleteProgram);

module.exports = router;
