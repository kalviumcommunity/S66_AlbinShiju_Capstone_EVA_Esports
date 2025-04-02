const express = require('express');
const router = express.Router();
const { createTournament, getTournaments } = require('../controllers/tournamentController');
const auth = require('../middleware/auth');



router.get('/', getTournaments);
router.post('/', auth, createTournament);

module.exports = router;
