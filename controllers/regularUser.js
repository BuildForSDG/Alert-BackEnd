const bcrypt = require('bcryptjs');
const RegularUser = require('../models/regularUser');

exports.signUp = (req, res) => {
  const {
    fullname,
    bloodType,
    email,
    password,
    phoneNumber,
    address,
    nextOfKinFullname,
    nextOfKinAddress,
    nextOfKinPhoneNumber
  } = req.body;

  RegularUser.findOne({
      email
    }).then((user) => {
      if (user) {
        return res.status(423).send({
          status: false,
          message: 'This email already exists'
        });
      } else {
        bcrypt
          .hash(password, 12)
          .then((hash) => {
            const user = new RegularUser({
              fullname,
              bloodType,
              email,
              hash,
              phoneNumber,
              address,
              nextOfKinFullname,
              nextOfKinAddress,
              nextOfKinPhoneNumber
            });
            return user.save();
          })
          .then((reguarUser) => {
            if (regularUser) {
              res.status(201).send({
                status: true,
                message: 'Regular User account successfully created',
                id: reguarUser._id
              })
            }
          });
      }
    })
    .catch(
      (error) => {
        res.status(500).json({
          error
        });
      }
    );
};
