const express = require("express");
const users = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../models/User");
users.use(cors());

// User registration
users.post("/register", (req, res) => {
  const currentDate = new Date();
  const userData = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
    created: currentDate
  };

  // Check if user exists
  User.findOne({
    email: req.body.email
  })
    .then(user => {
      if (!user) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          userData.password = hash;
          User.create(userData)
            .then(user => {
              res.status(201).json({ message: user.email + " registered!" });
            })
            .catch(err => {
              res.status(500).json({ error: err });
            });
        });
      } else {
        res.status(302).json({ error: "User already exists" });
      }
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

// User login
users.post("/login", (req, res) => {
  User.findOne({
    email: req.body.email
  })
    .then(user => {
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          const payload = {
            _id: user._id,
            email: user.email
          };
          let token = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: 2440
          });
          res.status(200).json({ "JWT token": token });
        } else {
          res.status(403).json({ error: "Incorrect password." });
        }
      } else {
        res.status(404).json({ error: "User does not exist" });
      }
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

module.exports = users;
