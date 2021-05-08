const { check, validationResult } = require('express-validator');
exports.validateSignupRequest = [
    check('firstName')
        .notEmpty()
        .withMessage('firstName is required'),

    check('lastName')
        .notEmpty()
        .withMessage('last name is required'),

    check('email')
        .isEmail()
        .withMessage('valid Email is required'),

    check('password')
        .isLength({ min: 8 })
        .withMessage('password must be at least 8 character long')
];

exports.validateSigninRequest = [

    check('email')
        .isEmail()
        .withMessage('valid Email is required'),

    check('password')
        .isLength({ min: 8 })
        .withMessage('password must be at least 8 character long')
];


exports.isRequestValidate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.array().length > 0) {
        return res.status(400).json({ error: errors.array()[0].msg })
    }
    next();
}