const User = require('../models/user');
const passport = require('passport');

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = new User({ username });
    await User.register(user, password);
    res.status(200).json({ success: true, message: 'User registered successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

exports.login = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error('Error:', err);
      return res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
    if (!user) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }
    req.logIn(user, (err) => {
      if (err) {
        console.error('Error:', err);
        return res.status(500).json({ success: false, error: 'Internal Server Error' });
      }
      return res.status(200).json({ success: true, message: 'User logged in successfully' });
    });
  })(req, res, next);
};

exports.logout = (req, res) => {
  req.logout();
  res.status(200).json({ success: true, message: 'User logged out successfully' });
};

exports.profile = (req, res) => {
  res.status(200).json({ success: true, user: req.user });
};