const express = require("express");
const jwt = require("jsonwebtoken");
var _ = require("lodash");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const checkAuth = require("../middleware/check-auth");

router.post("/signup", (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new User({
      email: req.body.email,
      password: hash,
    });

    user
      .save()
      .then((result) => {
        res.status(201).json({ message: "User created", result: result });
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  });
});

router.post("/login", loginCaseChange, (req, res, next) => {
  let getUser;
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          message: "User with that email not found!",
        });
      }
      getUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then((result) => {
      if (!result) {
        return res.status(401).json({
          message: "Invalid Password!",
        });
      }
      const token = jwt.sign(
        {
          id: getUser._id,
        },
        "secret_password_here_this_is_Temporary",
        { expiresIn: "1h" }
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600,
      });
    })
    .catch((err) => {
      return Promise.resolve();
    });
});

function loginCaseChange(req, res, next) {
  req.body.email = _.toLower(req.body.email);
  next();
}

function changeCase(req, res, next) {
  req.body.firstName = _.upperFirst(req.body.firstName);
  req.body.lastName = _.upperFirst(req.body.lastName);
  req.body.email = _.toLower(req.body.email);
  next();
}

module.exports = router;
