import { Component, OnInit } from "@angular/core";
import { CalculationService } from "../calculation.service";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";

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
  constructor(
    private calculationService: CalculationService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.users = this.calculationService.users;
  }
  selectedOptions() {
    // right now: ['1','3']
    return this.users.filter((opt) => opt.checked).map((opt) => opt.fullName);
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 4000,
    });
  }

  clearFields() {
    this.amountPaid = 0;
    this.userWhoPaid = "";
    this.titleOfExpense = "";

    this.users.forEach((element) => {
      element.checked = false;
    });
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
    this.router.navigate(["/inputPage"]);
    this.openSnackBar("Expense added successfully", "Done");
    this.clearFields();
  }
}
