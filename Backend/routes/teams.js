const express = require('express');
const router = express.Router();
const { createTeam, getTeams } = require('../controllers/teamController');
const auth = require('../middleware/auth');

router.get('/', getTeams);

module.exports = router;
