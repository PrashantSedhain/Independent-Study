const express = require("express");

const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");

router.post("/signup", (req, res, next) => {
  console.log(req.body.email);
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

router.get("/test", (req, res, next) => {
  res.status(200).json({ message: "Passed" });
});

module.exports = router;
