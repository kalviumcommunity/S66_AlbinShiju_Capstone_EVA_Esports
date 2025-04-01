const Tournament = require('../models/Tournament');


exports.getTournaments = async (req, res) => {
    try {
        const tournaments = await Tournament.find();
        res.json(tournaments);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching tournaments' });
    }
};
