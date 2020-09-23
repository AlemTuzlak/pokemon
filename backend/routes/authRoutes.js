const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const authValidator = require('../validation/authValidation');

const { isValidated } = require('../middleware/validaton');

//*------------------- Routes -----------------------//
router.put('/register', authValidator.register, isValidated, authController.register);
router.post('/login', authValidator.login, isValidated, authController.login);
router.post('/refresh', authValidator.refresh, isValidated, authController.refresh);

module.exports = router;
