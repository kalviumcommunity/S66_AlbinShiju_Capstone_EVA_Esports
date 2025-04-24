const express = require('express');
const router = express.Router();
const { createTournament, getTournaments, getTournamentById } = require('../controllers/tournamentController');
const auth = require('../middleware/auth');



router.get('/', getTournaments);
router.get('/:id', getTournamentById);
router.post('/', createTournament);

module.exports = router;
