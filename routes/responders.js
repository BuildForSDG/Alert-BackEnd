const express = require('express');

const router = express.Router();
const auth = require('../middleware/auth');
const validation = require('../middleware/validate');

const userController = require('../controllers/responders');

router.get('/:id', auth.authentication, userController.getDetails);
router.post('/signup', validation.responderssignUpValidationRules(), validation.validate, userController.signUp);
router.post('/login', validation.loginValidationRules(), validation.validate, userController.login);

module.exports = router;
