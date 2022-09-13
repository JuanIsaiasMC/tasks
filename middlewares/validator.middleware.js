const { body, validationResult, } = require("express-validator")


const checkUserValidations = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const errorMessage = errors.array().map(err => err.msg)
        const message = errorMessage.join('. ')
        return res.status(400).json({
            status: 'error',
            message
        })
    }
    next()
}

const createUserValidators = [
    body('name')
        .isString()
        .withMessage('Name must be a string')
        .isLength({ min: 3 })
        .withMessage('Name must be at least 3 characters'),
    body('email')
        .isEmail()
        .withMessage('Must be a valid email adress'),
    body('password')
        .isString()
        .withMessage('Password must be a string')
        .notEmpty()
        .withMessage('Password cannot be empty')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters'),
    checkUserValidations,
]

module.exports = { createUserValidators }