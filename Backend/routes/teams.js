const express = require('express');
const router = express.Router();
const { createTeam, getTeams,updateTeam} = require('../controllers/teamController');
const auth = require('../middleware/auth');

router.get('/', getTeams);
router.post('/', auth, createTeam);
router.put('/:id', auth, updateTeam);

module.exports = router;
