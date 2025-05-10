const mongoose = require('mongoose');
const Tournament = require('./models/Tournament');
const Team = require('./models/Team');
const User = require('./models/User');

const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/eva-esports';

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected for seeding');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    // Clear existing data
    await Tournament.deleteMany({});
    await Team.deleteMany({});
    await User.deleteMany({});

    // Create users
    const user1 = new User({ username: 'player1', email: 'player1@example.com', password: 'password123' });
    const user2 = new User({ username: 'player2', email: 'player2@example.com', password: 'password123' });
    await user1.save();
    await user2.save();

    // Create teams
    const team1 = new Team({ name: 'Team Alpha', members: [user1._id] });
    const team2 = new Team({ name: 'Team Beta', members: [user2._id] });
    await team1.save();
    await team2.save();

    // Create tournaments
    const tournament1 = new Tournament({
      title: 'Valorant Championship',
      prizePool: 5000,
      game: 'Valorant',
      date: new Date('2025-06-15'),
      teams: [team1._id, team2._id],
    });
    await tournament1.save();

    // Link tournaments to teams
    team1.tournaments = [tournament1._id];
    team2.tournaments = [tournament1._id];
    await team1.save();
    await team2.save();

    console.log('Seeding completed successfully');
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
};

connectDB().then(seedData);
