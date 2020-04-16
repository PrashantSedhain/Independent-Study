import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

interface Person {
  fullName: string;
  email: string;
  owes: { [index: string]: any };
}
interface Report {
  title: String;
  excludedPerson: String;
  amountPaid: Number;
  paidBy: String;
}
@Injectable({
  providedIn: "root",
})
export class CalculationService {
  headers = new HttpHeaders({
    "Content-Type": "application/json",
  });
  keyGenerator: number = 0;
  titleOfExpense: String;
  userWhoPaid: String;
  amountPaid: any;
  excludedPersons: any = [];
  users: Person[];
  nameArray: any = [];
  emailArray: any = [];
  totalReport: Report[] = [];
  finalOutputArray: any = [];
  bodyToBeSentToServer = {};
  moneyToPay: number;
  uri = "http://localhost:5000/sendEmails";
  constructor(private http: HttpClient) {}

  generateKeys() {
    this.keyGenerator = this.keyGenerator + 1;
    return "key" + this.keyGenerator;
  }

  populateBody() {
    this.finalOutputArray.forEach((output) => {
      this.bodyToBeSentToServer[this.generateKeys()] = output;
    });
  }

  sendEmails() {
    this.populateBody();
    var body = JSON.stringify(this.bodyToBeSentToServer);
    console.log("From client" + body);
    this.http
      .post(this.uri, body, { headers: this.headers })
      .subscribe((response) => {
        if (response == false) {
          alert("Failure sending emails.");
        } else {
          alert("Emails sent successfully.");
        }
      });
  }
  findExcludedPersonsAsArray(): string {
    var excludedPersonAsString = "";
    var i = 0;
    this.excludedPersons.forEach((element) => {
      if (i > 0) {
        excludedPersonAsString += ", ";
      }
      excludedPersonAsString += element;
      i++;
    });

    return excludedPersonAsString;
  }
  performCalculation() {
    //add the expense to report for report generation.
    var exPersonAsString: string = "None";
    const divNumber = this.users.length - this.excludedPersons.length;
    const amountOwed = this.amountPaid / divNumber;
    const test = this.userWhoPaid;
    this.users.forEach((user) => {
      var isExcluded = false;

      if (user.fullName != this.userWhoPaid) {
        if (this.excludedPersons.length != 0) {
          exPersonAsString = this.findExcludedPersonsAsArray();
          this.excludedPersons.forEach((excludedPerson: string) => {
            if (excludedPerson == user.fullName) {
              isExcluded = true;
            }
          });
        }
        if (isExcluded == false) {
          if (user.owes[this.userWhoPaid.toString()] != null) {
            var value = user.owes[this.userWhoPaid.toString()];
            user.owes[this.userWhoPaid.toString()] = amountOwed + value;
          } else {
            user.owes[this.userWhoPaid.toString()] = amountOwed;
          }
        }
      }
    });
    var item: Report = {
      title: this.titleOfExpense,
      excludedPerson: exPersonAsString,
      amountPaid: this.amountPaid,
      paidBy: this.userWhoPaid,
    };
    this.totalReport.push(item);
    console.log(this.users);
  }

  performFinalCalculation(): [] {
    var i = 0;
    var j = 0;
    for (i = 0; i < this.users.length; i++) {
      var name = this.users[i].fullName;
      for (j = i + 1; j < this.users.length; j++) {
        var usrName = this.users[j].fullName;
        if (
          this.users[i].owes[usrName] == null &&
          this.users[j].owes[name] == null
        ) {
          var output =
            "No transaction between " +
            this.users[i].fullName +
            " and " +
            this.users[j].fullName;
          this.finalOutputArray.push(output);
        } else if (this.users[i].owes[usrName] == null) {
          var output =
            this.users[j].fullName +
            " owes " +
            this.users[i].fullName +
            " " +
            this.users[j].owes[name].toFixed(2) +
            " dollars";

          this.finalOutputArray.push(output);
        } else if (this.users[j].owes[name] == null) {
          var output =
            this.users[i].fullName +
            " owes " +
            this.users[j].fullName +
            " " +
            this.users[i].owes[usrName].toFixed(2) +
            " dollars";
          this.finalOutputArray.push(output);
        } else {
          if (this.users[i].owes[usrName] > this.users[j].owes[name]) {
            this.moneyToPay =
              this.users[i].owes[usrName] - this.users[j].owes[name];

            var output =
              this.users[i].fullName +
              " owes " +
              this.users[j].fullName +
              " " +
              this.moneyToPay.toFixed(2) +
              " dollars";
            this.finalOutputArray.push(output);
          } else if (this.users[i].owes[usrName] == this.users[j].owes[name]) {
            var output =
              "Account is balanced between " +
              this.users[i].fullName +
              " and " +
              this.users[j].fullName;
            this.finalOutputArray.push(output);
          } else if (this.users[i].owes[usrName] < this.users[j].owes[name]) {
            this.moneyToPay =
              this.users[j].owes[name] - this.users[i].owes[usrName];
            this.moneyToPay.toFixed(2);
            var output =
              this.users[j].fullName +
              " owes " +
              this.users[i].fullName +
              " " +
              this.moneyToPay +
              " dollars";
            this.finalOutputArray.push(output);
          }
        }
      }
    }
    return this.finalOutputArray;
  }
}
