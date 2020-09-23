
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const User = require('../models/user');

const { entityExists } = require('../helpers/authHelpers');

//* PUT /auth/register
exports.register = async (req, res, next) => {
  const { email, username, password } = req.body;
  
  try {
    //* Hashes the password
    const hashedPw = await bcrypt.hash(password, 12);
    //* Creates the user object
    const user = new User({
      email: email,
      password: hashedPw,
      username: username
    });
    //* Saves the user to the database
    await user.save();
    //* Creates the JWT
    const token = jwt.sign(
      {
        email: user.email,
        userId: user._id.toString()
      },
      process.env.JWT_KEY,
      { expiresIn: process.env.JWT_EXPIRY }
    );

     //* Creates refresh token
     const refreshToken = jwt.sign(
      {
        token: token
      },
      process.env.JWT_KEY
    )

    user.refreshToken = refreshToken;
    await user.save();
    //* Returns the response
    res.status(201).json({ 
      message: 'User created!', 
      user: user, 
      userId: user._id, 
      token: token, 
      refreshToken: refreshToken 
    });

  } catch (error) {
    next(error);
  }
 
};
//* POST /auth/login
exports.login = async (req, res, next) => {
  const { email, password, username } = req.body;

  try {
    //* Finds the user with the corresponding email
    const user = await User.findOne({ $or: [ {email: email}, {username: username} ] });
    
    entityExists(user, 'A user with this email/username could not be found.');

    //* Encrypts and checks the passwords
    const passwordsEqual = await bcrypt.compare(password, user.password);
    
    if (!passwordsEqual) {
      const error = new Error('Wrong password!');
      error.statusCode = 401;
      throw error;
    }
    //* Creates the jwt
    const token = jwt.sign(
      {
        email: user.email,
        userId: user._id.toString()
      },
      process.env.JWT_KEY,
      { expiresIn: process.env.JWT_EXPIRY }
    );
    //* Creates refresh token
    const refreshToken = jwt.sign(
      {
        token: token
      },
      process.env.JWT_KEY
    )

    user.refreshToken = refreshToken;
    await user.save();
    //* Returns the response
    res.status(200).json({ 
      token: token, 
      user: user, 
      userId: user._id.toString(), 
      refreshToken: refreshToken 
    });

  } catch (err) {
    next(err);
  }
};

//* POST /auth/refresh
exports.refresh = async (req, res, next) => {
    const oldRefreshToken = req.body.refreshToken;
    try {

      const user = await User.findOne({refreshToken: oldRefreshToken});
      entityExists(user, 'User token expired', 401);
      
      //* Creates the jwt
      const accessToken = jwt.sign(
        {
          email: user.email,
          userId: user._id.toString()
        },
        process.env.JWT_KEY,
        { expiresIn: process.env.JWT_EXPIRY }
      );
    
      //* Creates refresh token
      const refreshToken = jwt.sign(
        {
          token: accessToken
        },
        process.env.JWT_KEY
      )
      
      user.refreshToken = refreshToken;
      await user.save();
      
      res.status(200).json({ message: 'User token refreshed!', accessToken: accessToken, refreshToken: refreshToken});

    } catch (error) {
        error.statusCode = 401;
        error.message = "Invalid request token";
        next(error);
    }
}