const express = require("express");
var _ = require("lodash");
const jwt = require("jsonwebtoken");
const router = express.Router();
const Group = require("../models/group");
const { route } = require("./user");

router.post("/create", (req, res, next) => {
  const usertoken = req.headers.authorization;
  const token = usertoken.split(" ");
  const decoded = jwt.verify(
    token[1],
    "secret_password_here_this_is_Temporary"
  );
  id = decoded["id"];

  const group = new Group({
    // author: {
    //   id: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User",
    //   },
    // },
    userId: this.id,
    count: req.body.count,
    names: req.body.names,
    emails: req.body.emails,
  });

  group.save().then((result) => {
    res.status(201).json({ message: "Saved Group", body: group });
  });
});
module.exports = router;
