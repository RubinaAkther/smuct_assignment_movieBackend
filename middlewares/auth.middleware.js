const jwt = require('jsonwebtoken');
const User = require('../models/user.model.js');

const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1] || req.cookies.token;
    if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await User.findById(decoded.userId).select('-password');
    if (!user) return res.status(401).json({ msg: 'User not found' });

    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ msg: 'Token is invalid' });
  }
};

module.exports = authenticate;
