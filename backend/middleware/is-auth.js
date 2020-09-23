const jwt = require('jsonwebtoken');

const User = require('../models/user');
const { entityExists } = require('../helpers/authHelpers');

const isAuth = async (req, res, next) => {
  const authHeader = req.get('Authorization');
  try {
    if (!authHeader) {
      const error = new Error('Not authenticated.');
      error.statusCode = 401;
      throw error;
    }
    const token = authHeader.split(' ')[1];
    let decodedToken;
    try {
      decodedToken = jwt.verify(token, process.env.JWT_KEY);
    } catch (error) {
      error.message = 'User token expired';
      error.statusCode = 401;
      throw error;
    }
    if (!decodedToken) {
      const error = new Error('Not authenticated.');
      error.statusCode = 401;
      throw error;
    }
    const user = await User.findById(decodedToken.userId);
    entityExists(user, 'User doesn\'t exist');
    req.user = user;
    req.userId = decodedToken.userId;
    next();
  } catch(error){
    next(error);
  }
};

const authMiddleware = {
    isAuth
};

module.exports = authMiddleware;