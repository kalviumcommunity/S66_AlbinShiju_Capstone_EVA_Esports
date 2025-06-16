const User = require('../models/User');
const admin = require('firebase-admin');


if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(require('../config/firebase-service-account.json'))
  });
}

exports.verifyToken = async (req, res) => {
  const { token } = req.body;
  
  try {
    // Verify Firebase token
    const decodedToken = await admin.auth().verifyIdToken(token);
    const firebaseUid = decodedToken.uid;
    const email = decodedToken.email;

    // Check if user exists in MongoDB
    let user = await User.findOne({ email });
    
    if (!user) {
      // Create new user if doesn't exist
      user = new User({ 
        email,
        firebaseUid,
        username: email.split('@')[0] // Default username
      });
      await user.save();
    }

    // Return user data
    res.json({ 
      success: true,
      user: {
        id: user._id,
        email: user.email,
        username: user.username
      }
    });
  } catch (err) {
    res.status(401).json({ 
      success: false,
      message: 'Invalid token',
      error: err.message 
    });
  }
};
