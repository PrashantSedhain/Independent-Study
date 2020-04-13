const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

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
  var api_key = "011ad30e22a2ae8f0e3227286b8b61c7-915161b7-d7aa06c0";
  var domain = "sandbox39f031d7bf7c4f5cbfd9f08cd6442f11.mailgun.org";
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
