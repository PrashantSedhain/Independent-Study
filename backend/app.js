const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const user = require("./models/user");

const userRouts = require("./routes/user");
const app = express();
mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose
  .connect(
    "mongodb+srv://prashant:prashant123@cluster0-zwt9f.mongodb.net/Splitapp",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Connected to database successfully.");
  })
  .catch(() => {
    console.log("Connection failed");
  });

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

app.use("/api/user", userRouts);

module.exports = app;
