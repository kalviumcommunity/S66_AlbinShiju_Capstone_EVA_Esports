const Tournament = require('../models/Tournament');


exports.getTournaments = async (req, res) => {
    try {
        const tournaments = await Tournament.find();
        res.json(tournaments);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching tournaments' });
    }
};
exports.createTournament = async (req, res) => {
    try {
        const { name, date } = req.body;
        const newTournament = new Tournament({ name, date });
        await newTournament.save();
        res.status(201).json(newTournament);
    } catch (err) {
        res.status(500).json({ message: 'Error creating tournament' });
    }
};