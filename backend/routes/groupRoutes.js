const { createGroup, addMemberToGroup, getGroupDetails } = require('../controllers/groupControllers');
const express = require('express');
const router = express.Router();

router.post('/create', createGroup);
router.post('/add-member', addMemberToGroup);
router.get('/:groupId', getGroupDetails);

module.exports = router;
