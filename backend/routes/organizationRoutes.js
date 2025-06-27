const express = require('express');
const router = express.Router();
const organizationController = require('../controllers/organizationController.js');
const auth = require('../middleware/auth');
const  {isAdmin}  = require('../middleware/role');

router.post('/', organizationController.createOrganization);
router.get('/', auth, organizationController.getOrganizations);
router.get('/:id', auth, organizationController.getOrganizationById);
router.put('/:id', auth, organizationController.updateOrganization);
router.delete('/:id', auth, organizationController.deleteOrganization);
// router.patch('/:id/approve', auth, isAdmin, organizationController.approveOrganization);
module.exports = router;
