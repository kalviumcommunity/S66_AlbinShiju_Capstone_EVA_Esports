const express = require('express');
const router = express.Router();
const { createTeam, getTeams, updateTeam, deleteTeam } = require('../controllers/teamController');
const auth = require('../middleware/auth');

router.get('/', getTeams);
router.post('/',  createTeam);
router.put('/:id', updateTeam);
router.delete('/:id', deleteTeam);

module.exports = router;
