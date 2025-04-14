const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const connectDB = require('./config/db');


const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(bodyParser.json());


app.use('/api/auth', require('./routes/auth'));
app.use('/api/tournaments', require('./routes/tournaments'));
app.use('/api/teams', require('./routes/teams'));
app.use('/api/users', require('./routes/users'));
app.use('/uploads', express.static('uploads'));
app.use('/api/firebase', require('./routes/firebaseAuthRoutes'));


connectDB()
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
