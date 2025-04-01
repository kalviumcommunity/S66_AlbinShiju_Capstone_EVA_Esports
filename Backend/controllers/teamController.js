const Team = require('../models/Team');

exports.getTeams = async (req, res) => {
    try {
        const teams = await Team.find().populate('members', 'username email');
        res.json(teams);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching teams' });
    }
};
