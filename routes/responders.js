const express = require('express');

const router = express.Router();
const validation = require('../middleware/validate');

const userController = require('../controllers/responders');


router.post('/signup', validation.responderssignUpValidationRules(), validation.validate, userController.signUp);


module.exports = router;
