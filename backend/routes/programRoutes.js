const express = require('express');
const router = express.Router();
const programController = require('../controllers/programController');
const auth = require('../middleware/auth');
const {hasRole} = require('../middleware/role');

// Get all programs
router.get('/', auth, hasRole(['organization']), programController.getPrograms);

// Enroll in a program
router.post('/:programId/enroll', auth, programController.enrollInProgram);

module.exports = router;
