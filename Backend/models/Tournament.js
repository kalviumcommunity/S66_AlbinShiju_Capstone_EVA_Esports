const mongoose = require('mongoose');

const TournamentSchema = new mongoose.Schema({
    title: { type: String, required: true },
    prizePool: { type: Number, required: true },
    game: { type: String, required: true },
    date: { type: Date, required: true },
    maxTeams: { type: Number, default: 16 },
    registrationDeadline: { type: Date, required: true },
    isRegistrationOpen: { type: Boolean, default: true },
    teams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team' }],
    registeredTeams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team' }]
}, { timestamps: true });

module.exports = mongoose.model('Tournament', TournamentSchema);
