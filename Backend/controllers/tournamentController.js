const Tournament = require('../models/Tournament');


exports.getTournaments = async (req, res) => {
    try {
        const tournaments = await Tournament.find().populate('teams');
        res.json(tournaments);
    } catch (err) {
        console.error('Error fetching tournaments:', err);
        res.status(500).json({ message: 'Error fetching tournaments' });
    }
};
exports.createTournament = async (req, res) => {
    try {
        const { title, prizePool, game, date } = req.body;
        const newTournament = new Tournament({ title, prizePool, game, date });
        await newTournament.save();
        res.status(201).json(newTournament);
    } catch (err) {
        res.status(500).json({ message: 'Error creating tournament' });
    }
};

exports.getTournamentById = async (req, res) => {
    try {
        const tournament = await Tournament.findById(req.params.id).populate('teams');
        if (!tournament) {
            return res.status(404).json({ message: 'Tournament not found' });
        }
        res.json(tournament);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching tournament' });
    }
};
