const express = require('express');

const router = express.Router();
const validation = require('../middleware/validate');

const userController = require('../controllers/regularUser');


router.post('/signup', validation.signUpValidationRules(), validation.validate, userController.signUp);


module.exports = router;
