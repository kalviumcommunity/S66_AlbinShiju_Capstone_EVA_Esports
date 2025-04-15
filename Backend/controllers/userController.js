const User = require('../models/User');
const upload = require('../utils/multerConfig'); 

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateUser = [
  upload.single('avatar'), 
  async (req, res) => {
    try {
      const { username, email } = req.body;
      const avatar = req.file ? req.file.path : undefined; 

      const updatedFields = { username, email };
      if (avatar) updatedFields.avatar = avatar;

      const updatedUser = await User.findByIdAndUpdate(
        req.user.id,
        updatedFields,
        { new: true, runValidators: true }
      ).select('-password');

      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json({ message: 'User updated successfully', user: updatedUser });
    } catch (err) {
      res.status(500).json({ message: 'Error updating user', error: err.message });
    }
  },
];
