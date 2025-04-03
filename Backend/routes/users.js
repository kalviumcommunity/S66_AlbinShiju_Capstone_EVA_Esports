const express = require('express');
const router = express.Router();
const { getUserProfile, updateUserProfile,updateUser } = require('../controllers/userController');
const auth = require('../middleware/auth');

router.get('/profile', auth, getUserProfile);
router.put('/:id', auth, updateUser);


module.exports = router;
