const express = require("express");
var _ = require("lodash");
const jwt = require("jsonwebtoken");
const router = express.Router();
const Expense = require("../models/expense");

router.post("/create", (req, res, next) => {
  const usertoken = req.headers.authorization;
  const token = usertoken.split(" ");
  const decoded = jwt.verify(
    token[1],
    "secret_password_here_this_is_Temporary"
  );
  id = decoded["id"];
  const expense = new Expense({
    userId: this.id,
    expenseTitle: req.body.expenseTitle,
    expenses: req.body.expenses,
  });
  expense.save().then(() => {
    res.status(201).json({ message: "Expense Saved ", body: expense });
  });
});

router.put("/update", (req, res, next) => {
  Expense.findByIdAndUpdate(
    req.body.userId,
    { $push: { expenses: req.body.expense } },
    function (err, result) {
      if (err) {
        res.send(err);
      } else {
        res.status(201).json({ message: "Expense Updated ", body: result });
      }
    }
  );
});

router.get("/expense", (req, res, next) => {
  const usertoken = req.headers.authorization;
  const token = usertoken.split(" ");
  const decoded = jwt.verify(
    token[1],
    "secret_password_here_this_is_Temporary"
  );
  id = decoded["id"];
  Expense.find({ userId: id }).then((result) => {
    if (result) {
      res.status(200).json({ message: true, data: result });
    } else {
      res.status(400).json({ message: false, data: null });
    }
  });
});

router.get("/findGroupByID/:id", async (req, res, next) => {
  const group = Group.findById(req.params.id).then((response) => {
    if (response) {
      res.status(200).json({ message: true, data: response });
    } else {
      res.status(400).json({ message: false, data: null });
    }
  });
});
module.exports = router;
