const RegularUser = require("../models/regularUser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signUp = (req, res, next) => {
  const {
    fullname,
    blood_type,
    email,
    password,
    phone_number,
    address,
    next_of_kin_fullname,
    next_of_kin_address,
    next_of_kin_phone_number
  } = req.body
  RegularUser.findOne({
      email,
    }).then((user) => {
      if (user) {
        return res.status(423).send({
          status: false,
          message: "This email already exists",
        });
      } else {
        bcrypt
          .hash(password, 12)
          .then((password) => {
            let user = new RegularUser({
              fullname,
              blood_type,
              email,
              password,
              phone_number,
              address,
              next_of_kin_fullname,
              next_of_kin_address,
              next_of_kin_phone_number
            });
            return user.save();
          })
          .then((user) => {
            if (user) {
              res.status(201).send({
                status: true,
                message: "Regular User account successfully created",
                id: user._id,
              })
            }
          })
      }
    })
    .catch(
      (error) => {
        res.status(500).json({
          error: error
        });
      }
    )
}
