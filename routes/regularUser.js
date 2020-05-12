const express = require('express');

const router = express.Router();
const auth = require('../middleware/auth');
const validation = require('../middleware/validate');

const userController = require('../controllers/regularUser');

router.get('/:id', auth.authentication, userController.getDetails);
router.post('/signup', validation.signUpValidationRules(), validation.validate, userController.signUp);
router.post('/login', validation.loginValidationRules(), validation.validate, userController.login);
router.put('/:id', auth.authentication, validation.updateValidationRules(), validation.validate, userController.updateDetails);


module.exports = router;
