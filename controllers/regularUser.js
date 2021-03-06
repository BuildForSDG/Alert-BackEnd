const bcrypt = require('bcryptjs');
const RegularUser = require('../models/regularUser');
const jwt = require("jsonwebtoken");

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

  RegularUser.findOne({email})
    .then((user) => {
      if (user) {
        return res.status(423).send({
          status: false,
          message: 'This email already exists'
        });
      }
    console.log("here");
    bcrypt
      .hash(password, 12)
      .then((password) => {
      const ruser = new RegularUser({
        fullname,
        bloodType,
        email,
        password,
        phoneNumber,
        address,
        nextOfKinFullname,
        nextOfKinAddress,
        nextOfKinPhoneNumber
      });
      return ruser.save();
      })
      .then((regularUser) => {
        if (regularUser) {
          res.status(201).send({
            status: true,
            message: 'Regular User account successfully created',
            id: regularUser._id
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

exports.login = (req, res) => {
  const {
    email,
    password
  } = req.body
  RegularUser.findOne({
    email
  })
  .then((user) => {
    if (!user) {
      return res.status(404).send({
        status: false,
        message: "User not found, please provide valid credentials"
      });
    }
    bcrypt.compare(password, user.password).then((valid) => {
      if (!valid) {
        return res.status(403).send({
          status: false,
          message: "Incorrect username or password, please review details and try again"
        });
      }
      const token = jwt.sign({
        email: user.email,
        _id: user._id,
        },process.env.SECRET, {expiresIn: "1hr"}
      );
      return res.status(200).send({
        status: "success",
        _id: user._id,
        token,
      });
    });
  })
  .catch((error) => {
    res.status(500).json({
      error: error
    });
  })
}

exports.getDetails = (req, res) => {
  const user_id = req.params.id;
  const filter = {
      _id: user_id
  };
  RegularUser.findOne(filter).then((user) => {
      if (user) {
          return res.status(200).send({
              status: true,
              data: user
          });
      }
  }).catch(
      (error) => {
          res.status(500).json({
              error
          });
      }
  )
}

exports.updateDetails = (req, res) => {
  const user_id = req.params.id;
    const {
      fullname,
      email,
      phoneNumber,
      address,
      nextOfKinFullname,
      nextOfKinAddress,
      nextOfKinPhoneNumber
    } = req.body;
    const filter = {
        _id: user_id
    };
    const update = {
      fullname,
      email,
      phoneNumber,
      address,
      nextOfKinFullname,
      nextOfKinAddress,
      nextOfKinPhoneNumber
    };
    RegularUser.findOneAndUpdate(filter, update, {
        new: true
    }).then((user) => {
        if (user) {
            return res.status(201).send({
                status: true,
                message: "User details was updated successfully",
                name: user.name,
                id: user._id,
            });
        }
    }).catch(
        (error) => {
            res.status(500).json({
                error: error
            });
        }
    )
}