const { body } = require('express-validator');

const User = require('../models/user');

const register = [
    body('email').isEmail().withMessage('Please enter a valid email.')
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then(userDoc => {
          if (userDoc) {
            return Promise.reject('E-Mail address already exists!');
          }
        });
      }),
    body('password').trim().isLength({ min: 5 }).withMessage('Please enter a valid password.'),
    body('username').trim().notEmpty().withMessage('Please enter a valid username!')
      .custom((value, { req }) => {
        return User.findOne({username: value}).then(user => {
          if(user) {
            return Promise.reject('Username already exists!')
          }
        })
      })
      
  ];

const login = [
    body('email').optional().notEmpty().withMessage('Please enter a valid email.'),
    body('username').optional().notEmpty().withMessage('Please enter a valid username'),
    body('password').isLength({min: 8}).trim().notEmpty().withMessage('Please enter a password.'),
];

const refresh = [
  body('refreshToken').notEmpty().withMessage('Refresh token required')
];

const authValidator = {
    register,
    login,
    refresh
}

module.exports = authValidator;