import { Injectable } from "@angular/core";

interface Person {
  fullName: string;
  email: string;
}

@Injectable({
  providedIn: "root"
})
export class CalculationService {
  users: Person[] = [];
  nameArray: any = [];
  emailArray: any = [];

  constructor() {}
}
