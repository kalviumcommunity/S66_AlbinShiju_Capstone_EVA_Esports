const express = require('express');
const router = express.Router();
const { createTeam, getTeams, updateTeam, deleteTeam } = require('../controllers/teamController');
const auth = require('../middleware/auth');

router.get('/', getTeams);
router.post('/', auth, createTeam);
router.put('/:id', auth, updateTeam);
router.delete('/:id', auth, deleteTeam);

module.exports = router;
