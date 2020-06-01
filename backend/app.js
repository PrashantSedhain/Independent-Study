const express = require("express");
const mongoose = require("mongoose");

const app = express();

mongoose.connect();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/posts", (req, res, next) => {
  const dummy = {
    name: "Prashant",
    class: "Test",
  };
  res.json(dummy);
});

module.exports = app;
