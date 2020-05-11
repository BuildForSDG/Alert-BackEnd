const bcrypt = require('bcryptjs');
const Responder = require('../models/responders.js');

exports.signUp = (req, res) => {
  const {
    name,
    type,
    email,
    password,
    phoneNumber,
    address
  } = req.body;

  Responder.findOne({email})
    .then((user) => {
      if (user) {
        return res.status(423).send({
          status: false,
          message: 'This email already exists'
        });
      }
    bcrypt
      .hash(password, 12)
      .then((hash) => {
      const responder = new Responder({
        name,
        type,
        email,
        password,
        phoneNumber,
        address
      });
      return responder.save();
      })
      .then((user) => {
        if (user) {
          res.status(201).send({
            status: true,
            message: 'Responder account successfully created',
            id: user._id
          });
        }
      });
    })
    .catch(
      (error) => {
        res.status(500).json({
          error
        });
      }
    );
};
