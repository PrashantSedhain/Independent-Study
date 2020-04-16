const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();
//Body parser
app.use(express.json());
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
const api_key = process.env.API_KEY;
const domain = process.env.DOMAIN;
var emailList = "";

app.post("/getEmails", function (req, res) {
  emailList = "";
  var emailAddresses = JSON.stringify(req.body);
  var obj = JSON.parse(emailAddresses);
  let arrValues = Object.values(obj);
  var i = 0;
  arrValues.forEach((item) => {
    if (i > 0) {
      emailList += ",";
    }
    i = i + 1;
    emailList += item;
  });

  if (emailList == null) {
    res.status(400).json({ success: false });
  } else {
    console.log(emailList);
    res.status(200).json({ success: true });
  }
});

app.post("/sendEmails", function (req, res) {
  var mailgun = require("mailgun-js")({ apiKey: api_key, domain: domain });
  var output = JSON.stringify(req.body);
  var stringOutput = "";
  var i = 1;
  let obj = JSON.parse(output);
  let arrValues = Object.values(obj);
  arrValues.forEach((item) => {
    stringOutput += i + ".  " + item + ".\n";
    i = i + 1;
  });

  console.log("Logging from server " + emailList);
  var data = {
    from: "Splitwise <peterpixel123@gmail.com>",
    to: `${emailList}`,
    subject: "Your Monthly Expense Report",
    text: `Hello there,\n\nPlease find the details of your monthly expense below.\n\n${stringOutput}\nThank you for using splitwise. If you experienced any kind of issue while using this application please be sure to update us at prashantased@gmail.com. Your opinion is important to us.\n\nSincerely,\nPrashant Sedhain\nSplitwise Inc.`,
  };
  mailgun.messages().send(data, function (error, body) {
    if (error) {
      res.status(400).json({ success: false });
    } else {
      res.status(200).json({ success: true });
    }
  });
});
