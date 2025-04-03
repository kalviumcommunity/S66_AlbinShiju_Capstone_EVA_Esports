const mongoose = require('mongoose');

const TournamentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    date: { type: Date, required: true },
    teams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team' }],
}, { timestamps: true });

module.exports = mongoose.model('Tournament', TournamentSchema);
