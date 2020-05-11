const {
    body,
    validationResult
} = require('express-validator');

exports.signUpValidationRules = () => {
    return [
        // username must be an email
        body("fullname").notEmpty().trim().escape().withMessage("Full name must not be empty"),
        body("phone_number").notEmpty().trim().escape().withMessage("Phone Number must not be empty"),
        body("blood_type").notEmpty().isIn(["-A", "B", "AB","O"]).withMessage("Blood type should be '-A' or 'B', or 'AB', or 'O' "),
        body("email").notEmpty().isEmail().normalizeEmail().withMessage("Email is required"),
        body("password").notEmpty().isLength({
            min: 5
        }).withMessage("Password must have at least 5 characters"),
        body("address").notEmpty().trim().escape().withMessage("Address must not be empty"),
        body("next_of_kin_fullname").notEmpty().trim().escape().withMessage("Next of kin fullname must not be empty"),
        body("next_of_kin_address").notEmpty().trim().escape().withMessage("Next of kin fullname must not be empty"),
        body("next_of_kin_phone_number").notEmpty().trim().escape().withMessage("Next of kin fullname must not be empty"),
    ]
}



exports.validate = (req, res, next) => {
    try {
        const errors = validationResult(req)
        if (errors.isEmpty()) {
            return next()
        }
        const extractedErrors = []
        errors.array().map(err => extractedErrors.push({
            [err.param]: err.msg
        }))

        return res.status(422).json({
            errors: extractedErrors,
        })

    } catch {
        res.status(401).json({
            error: "Unauthorized",
            status: "error"
        })
    }
}