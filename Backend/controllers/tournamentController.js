const Tournament = require('../models/Tournament');
const Team = require('../models/Team');

exports.getTournaments = async (req, res) => {
    try {
        const tournaments = await Tournament.find().populate('teams registeredTeams');
        res.json(tournaments);
    } catch (err) {
        console.error('Error fetching tournaments:', err);
        res.status(500).json({ message: 'Error fetching tournaments' });
    }
};

exports.createTournament = async (req, res) => {
    try {
        const { title, prizePool, game, date, maxTeams, registrationDeadline } = req.body;
        const newTournament = new Tournament({ 
            title, 
            prizePool, 
            game, 
            date, 
            maxTeams: maxTeams || 16,
            registrationDeadline: registrationDeadline || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            isRegistrationOpen: true
        });
        await newTournament.save();
        res.status(201).json(newTournament);
    } catch (err) {
        res.status(500).json({ message: 'Error creating tournament' });
    }
};

exports.getTournamentById = async (req, res) => {
    try {
        const tournament = await Tournament.findById(req.params.id).populate('teams registeredTeams');
        if (!tournament) {
            return res.status(404).json({ message: 'Tournament not found' });
        }
        res.json(tournament);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching tournament' });
    }
};

exports.joinTournament = async (req, res) => {
    try {
        const { tournamentId } = req.params;
        const { teamId } = req.body;
        const userId = req.user.id;

        const tournament = await Tournament.findById(tournamentId);
        if (!tournament) {
            return res.status(404).json({ message: 'Tournament not found' });
        }

        if (!tournament.isRegistrationOpen) {
            return res.status(400).json({ message: 'Registration is closed for this tournament' });
        }

        if (new Date() > new Date(tournament.registrationDeadline)) {
            return res.status(400).json({ message: 'Registration deadline has passed' });
        }

        if (tournament.registeredTeams.length >= tournament.maxTeams) {
            return res.status(400).json({ message: 'Tournament is full' });
        }

        if (tournament.registeredTeams.includes(teamId)) {
            return res.status(400).json({ message: 'Team is already registered for this tournament' });
        }

        const team = await Team.findById(teamId);
        if (!team) {
            return res.status(404).json({ message: 'Team not found' });
        }

        if (!team.members.includes(userId)) {
            return res.status(403).json({ message: 'You are not a member of this team' });
        }

        tournament.registeredTeams.push(teamId);
        await tournament.save();

        team.tournaments.push(tournamentId);
        await team.save();

        res.json({ 
            message: 'Successfully joined tournament', 
            tournament,
            team: teamId 
        });

    } catch (err) {
        console.error('Error joining tournament:', err);
        res.status(500).json({ message: 'Error joining tournament' });
    }
};
