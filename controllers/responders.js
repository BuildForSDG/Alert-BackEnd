const bcrypt = require('bcryptjs');
const Responder = require('../models/responders.js');
const jwt = require("jsonwebtoken");

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
      .then((password) => {
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

exports.login = (req, res) => {
  const {
    email,
    password
  } = req.body
  Responder.findOne({
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
  Responder.findOne(filter).then((user) => {
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
      name,
      email,
      phoneNumber,
      address,
    } = req.body;
    const filter = {
        _id: user_id
    };
    const update = {
      name,
      email,
      phoneNumber,
      address,
    };
    Responder.findOneAndUpdate(filter, update, {
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