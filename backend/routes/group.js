const express = require("express");
var _ = require("lodash");
const jwt = require("jsonwebtoken");
const router = express.Router();
const Group = require("../models/group");
const { route } = require("./user");
const { findById } = require("../models/group");
const { find } = require("lodash");

function getUserID() {
  return id;
}

router.post("/create", (req, res, next) => {
  const usertoken = req.headers.authorization;
  const token = usertoken.split(" ");
  const decoded = jwt.verify(
    token[1],
    "secret_password_here_this_is_Temporary"
  );
  id = decoded["id"];
  const group = new Group({
    userId: this.id,
    count: req.body.count,
    names: req.body.names,
    emails: req.body.emails,
  });

  group.save().then((result) => {
    res.status(201).json({ message: "Saved Group", body: group });
  });
});

router.get("/findGroups", (req, res, next) => {
  const usertoken = req.headers.authorization;
  const token = usertoken.split(" ");
  const decoded = jwt.verify(
    token[1],
    "secret_password_here_this_is_Temporary"
  );
  id = decoded["id"];
  Group.find({ userId: id }).then((groups) => {
    if (groups) {
      res.status(200).json({ message: true, data: groups });
    } else {
      res.status(400).json({ message: false, data: null });
    }
  });
});
module.exports = router;
