import { Injectable } from "@angular/core";

interface OweTable {
  owes: Record<string, Number>;
}

interface Person {
  fullName: string;
  email: string;
  oweTable: OweTable[];
}

@Injectable({
  providedIn: "root"
})
export class CalculationService {
  users: Person[] = [];
  nameArray: any = [];
  emailArray: any = [];

  newPerson: OweTable = {
    owes: {
      prashant: 100
    }
  };

  constructor() {
    console.log(this.newPerson);
  }
}
