const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT;

// Configure CORS to allow specific origins and credentials
const corsOptions = {
  origin: ['https://eesports.netlify.app', 'http://localhost:5173'], // Add your frontend URLs
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/tournaments', require('./routes/tournaments'));
app.use('/api/teams', require('./routes/teams'));
app.use('/api/users', require('./routes/users'));
app.use('/uploads', express.static('uploads'));
app.use('/api/firebase', require('./routes/firebaseAuthRoutes'));

connectDB();
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
