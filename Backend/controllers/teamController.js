const Team = require('../models/Team');

exports.getTeams = async (req, res) => {
    try {
        const teams = await Team.find().populate('members', 'username email');
        res.json(teams);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching teams' });
    }
};

exports.createTeam = async (req, res) => {
    try {
        const { name, members } = req.body;
        const team = new Team({ name, members });
        await team.save();

        res.status(201).json(team);
    } catch (err) {
        res.status(500).json({ message: 'Error creating team' });
    }
};
exports.updateTeam = async (req, res) => {
    try {
        const { name, members } = req.body;

     
        const updatedTeam = await Team.findByIdAndUpdate(
            req.params.id,
            { name, members },
            { new: true, runValidators: true }
        ).populate('members', 'username email');

        if (!updatedTeam) {
            return res.status(404).json({ message: 'Team not found' });
        }

        res.json({ message: 'Team updated successfully', team: updatedTeam });
    } catch (err) {
        res.status(500).json({ message: 'Error updating team', error: err.message });
    }
};
