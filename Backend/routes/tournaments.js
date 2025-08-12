const express = require('express');
const router = express.Router();
const { createTournament, getTournaments, getTournamentById, joinTournament } = require('../controllers/tournamentController');
const auth = require('../middleware/auth');

router.get('/', getTournaments);
router.get('/:id', getTournamentById);
router.post('/', createTournament);
router.post('/:id/join', auth, joinTournament);

module.exports = router;
