const { validationResult } = require('express-validator');

exports.isValidated = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed.');
        error.statusCode = 401;
        error.data = errors.array();
        throw error;
    }
    next();
};
