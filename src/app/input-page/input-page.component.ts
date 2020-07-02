import { Component, OnInit } from "@angular/core";
import { CalculationService } from "../calculation.service";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SnackbarService } from "../snackbar.service";

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
  collectiveTitleAdded: boolean;
  collectiveTitleOfExpense: String;
  titleOfExpense: String;
  userWhoPaid: String;
  amountPaid: Number;
  users: any = [];
  excludedPersons: any = [];
  constructor(
    private calculationService: CalculationService,
    private router: Router,
    private snackBarService: SnackbarService
  ) {}

  ngOnInit() {
    this.users = this.calculationService.users;
    this.collectiveTitleAdded = false;
  }
  selectedOptions() {
    // right now: ['1','3']
    return this.users.filter((opt) => opt.checked).map((opt) => opt.fullName);
  }

  isValid() {
    if (this.titleOfExpense == null || this.titleOfExpense == "") {
      return 1;
    }

    if (this.amountPaid < 0) {
      return 2;
    }
    if (this.amountPaid == 0) {
      return 3;
    }
    if (this.amountPaid == null) {
      return 4;
    }

    if (this.userWhoPaid == null) {
      return 5;
    }

    return 6;
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
    var retVal = this.isValid();
    if (
      this.collectiveTitleOfExpense == null ||
      this.collectiveTitleOfExpense == ""
    ) {
      this.snackBarService.openSnackBar("Title must be included", "Error");
    } else {
      this.collectiveTitleAdded = true;
    }

    if (retVal == 6 && this.collectiveTitleAdded) {
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
      this.snackBarService.openSnackBar(
        "Expense added successfully",
        "Success"
      );
      this.clearFields();
    } else if (retVal == 1) {
      this.snackBarService.openSnackBar("Spent for cannot be empty", "Error");
    } else if (retVal == 2) {
      this.snackBarService.openSnackBar(
        "Amount paid cannot be negative",
        "Error"
      );
    } else if (retVal == 3) {
      this.snackBarService.openSnackBar("Amount paid cannot be 0", "Error");
    } else if (retVal == 4) {
      this.snackBarService.openSnackBar("Amount paid cannot be empty", "Error");
    } else if (retVal == 5) {
      this.snackBarService.openSnackBar(
        "Paid by field must be selected",
        "Error"
      );
    }
  }
}
