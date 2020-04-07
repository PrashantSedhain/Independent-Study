import { Component, OnInit } from "@angular/core";
import { CalculationService } from "../calculation.service";

interface Person {
  fullName: string;
  email: string;
  owe: {};
  checked: false;
}
@Component({
  selector: "app-input-page",
  templateUrl: "./input-page.component.html",
  styleUrls: ["./input-page.component.css"],
})
export class InputPageComponent implements OnInit {
  titleOfExpense: String;
  userWhoPaid: String;
  amountPaid: Number;
  users: any = [];
  excludedPersons: any = [];
  constructor(private calculationService: CalculationService) {}

  ngOnInit() {
    this.users = this.calculationService.users;
  }
  selectedOptions() {
    // right now: ['1','3']
    return this.users.filter((opt) => opt.checked).map((opt) => opt.fullName);
  }
  onAddExpense() {
    this.excludedPersons = this.selectedOptions();
    console.log(this.titleOfExpense);
    console.log(this.excludedPersons);
    console.log(this.userWhoPaid);
    console.log("Amount paid is " + this.amountPaid);
    this.calculationService.titleOfExpense = this.titleOfExpense;
    this.calculationService.excludedPersons = this.excludedPersons;
    this.calculationService.userWhoPaid = this.userWhoPaid;
    this.calculationService.amountPaid = this.amountPaid;
    this.calculationService.performCalculation();
  }
}
