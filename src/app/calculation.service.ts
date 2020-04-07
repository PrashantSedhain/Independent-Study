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

  newPerson: Person = {
    fullName: "Prashant Sedhain",
    email: "prashantased@gmail.com",
    owes: {},
  };

  constructor() {}

  performCalculation() {
    const divNumber = this.users.length - this.excludedPersons.length;
    const amountOwed = this.amountPaid / divNumber;
    const test = this.userWhoPaid;
    this.users.forEach((user) => {
      var isExcluded = false;

      if (user.fullName != this.userWhoPaid) {
        if (this.excludedPersons != null) {
          this.excludedPersons.forEach((excludedPerson) => {
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
    console.log(this.users);
  }
}
