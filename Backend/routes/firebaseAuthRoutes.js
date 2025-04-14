const express = require('express');
const router = express.Router();
const { verifyToken } = require('../controllers/firebaseAuthController');

// Firebase authentication routes
router.post('/verify', verifyToken);

module.exports = router;
