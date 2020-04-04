import { Injectable } from "@angular/core";

interface Person {
  fullName: string;
  email: string;
  owes: {};
}

@Injectable({
  providedIn: "root",
})
export class CalculationService {
  
  titleOfExpense: String;
  userWhoPaid: String;
  amountPaid: Number;
  excludedPersons: any = [];
  users: Person[];
  nameArray: any = [];
  emailArray: any = [];

  newPerson: Person = {
    fullName: "Prashant Sedhain",
    email: "prashantased@gmail.com",
    owes: {},
  };

  constructor() {
    console.log(this.newPerson);
  }
}
