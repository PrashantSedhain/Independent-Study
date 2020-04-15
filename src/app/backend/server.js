const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();
app.use(cors());
dotenv.config({ path: "./config/config.env" });
const PORT = 5000;

const server = app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});

//Handle unhandled Promise Rejection
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);

  //Close the server and exit the process
  server.close(() => process.exit(1));
});

// respond with "hello world" when a GET request is made to the homepage
app.get("/sendEmails", function (req, res) {
  var api_key = process.env(API_KEY);
  var domain = process.env(DOMAIN);
  var mailgun = require("mailgun-js")({ apiKey: api_key, domain: domain });

  var data = {
    from: "Splitwise <peterpixel123@gmail.com>",
    to: "prashantased@gmail.com",
    subject: "Your Monthly Expense Report",
    text:
      "Hello there, Please find your monthly expense report from the link below.",
  };

  mailgun.messages().send(data, function (error, body) {
    if (error) {
      res.status(400).json({ success: false });
    } else {
      res.status(200).json({ success: true });
    }
  });
});
