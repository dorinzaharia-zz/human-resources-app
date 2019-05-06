const express = require("express");
const users = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const User = require("../models/User");

const checkToken = (req, res, next) => {
    const header = req.headers["authorization"];

    if (typeof header !== "undefined") {
        const bearer = header.split(" ");
        const token = bearer[1];
        req.token = token;
        next();
    } else {
        res.sendStatus(403);
    }
};

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
                            res.status(201).json({
                                message:
                                    user.email + " successfully registered!"
                            });
                        })
                        .catch(err => {
                            res.status(500).json({ error: err });
                        });
                });
            } else {
                res.status(302).json({ error: user.email + " already exists" });
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
                        expiresIn: "1h"
                    });
                    res.status(200).json({ Token: token });
                } else {
                    res.status(403).json({ error: "Incorrect password." });
                }
            } else {
                res.status(404).json({ error: "User does not exist" });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

// Get users data
users.get("/", checkToken, (req, res) => {
    //verify the JWT token generated for the user
    jwt.verify(req.token, process.env.SECRET_KEY, err => {
        if (err) {
            res.status(403).json({
                error: "Could not connect to the protected route"
            });
        } else {
            User.find()
                .sort({ last_name: 1 })
                .then(docs => {
                    const response = {
                        users: docs.map(doc => doc)
                    };
                    res.status(200).json(response);
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        error: err
                    });
                });
        }
    });
});

// Update users data
users.patch("/:id", checkToken, (req, res) => {
    jwt.verify(req.token, process.env.SECRET_KEY, err => {
        if (err) {
            res.status(403).json({
                error: "Could not connect to the protected route"
            });
        } else {
            const id = req.params.id;

            if (req.body.password) {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    req.body.password = hash;
                    User.updateOne({ _id: id }, { $set: req.body })
                        .then(result => {
                            res.status(200).json(result);
                        })
                        .catch(err => {
                            res.status(500).json({ error: err });
                        });
                });
            } else {
                User.updateOne({ _id: id }, { $set: req.body })
                    .then(result => {
                        res.status(200).json(result);
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({
                            error: err
                        });
                    });
            }
        }
    });
});

// Delete users data
users.delete("/:id", checkToken, (req, res) => {
    jwt.verify(req.token, process.env.SECRET_KEY, err => {
        if (err) {
            res.status(403).json({
                error: "Could not connect to the protected route"
            });
        } else {
            const id = req.params.id;
            User.remove({ _id: id })
                .then(result => {
                    res.status(200).json({
                        message: "User deleted"
                    });
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        error: err
                    });
                });
        }
    });
});

module.exports = users;
