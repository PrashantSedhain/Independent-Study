const express = require("express");
var _ = require("lodash");
const router = express.Router();
const Group = require("../models/group");
const { route } = require("./user");

router.post("/create", (req, res, next) => {
  const group = new Group({
    count: 5,
    names: ["Prashant Sedhain"],
    emails: ["prashantased@gmail.com"],
  });

  group.save().then((result) => {
    res.status(201).json({ message: "Saved Group", body: group });
  });
});
module.exports = router;
