const express = require("express");
var _ = require("lodash");
const jwt = require("jsonwebtoken");
const router = express.Router();
const Expense = require("../models/expense");

router.post("/create", (req, res, next) => {
  const expense = new Expense({
    groupName: req.body.groupName,
    userId: req.body.userId,
    expenseTitle: req.body.expenseTitle,
    expenses: req.body.expense,
  });
  expense.save().then(() => {
    res.status(201).json({ message: "Expense Saved ", body: expense });
  });
});

router.put("/update", (req, res, next) => {
  Expense.findOneAndUpdate(
    {
      userId: req.body.userId,
      groupName: req.body.groupName,
      expenseTitle: req.body.expenseTitle,
    },
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

router.get("/getExpense", (req, res, next) => {
  Expense.findOne({
    userId: req.body.userId,
    groupName: req.body.groupName,
    expenseTitle: req.body.expenseTitle,
  }),
    function (err, result) {
      if (err) {
        res.send(err);
      } else {
        res.status(201).json({ message: "True", body: result });
      }
    };
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
