const mongoose = require('mongoose');

const TournamentSchema = new mongoose.Schema({
    title: { type: String, required: true },
    prizePool: { type: Number, required: true },
    game: { type: String, required: true },
    date: { type: Date, required: true },
    teams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team' }],
}, { timestamps: true });

module.exports = mongoose.model('Tournament', TournamentSchema);
