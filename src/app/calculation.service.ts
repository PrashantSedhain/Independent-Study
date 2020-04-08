import { Injectable } from "@angular/core";

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
  titleOfExpense: String;
  userWhoPaid: String;
  amountPaid: any;
  excludedPersons: any = [];
  users: Person[];
  nameArray: any = [];
  emailArray: any = [];
  totalReport: Report[] = [];

  constructor() {}

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
}
