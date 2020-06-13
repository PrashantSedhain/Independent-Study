import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";
import { CalculationService } from "../calculation.service";
import { SnackbarService } from "../snackbar.service";
import { Router } from "@angular/router";

interface Group {
  name: String;
  count: Number;
  names: Array<String>;
  emails: Array<String>;
}

interface Person {
  fullName: string;
  email: string;
  owes: {};
}

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}
@Component({
  selector: "app-split-page",
  templateUrl: "./split-page.component.html",
  styleUrls: ["./split-page.component.css"],
})
export class SplitPageComponent implements OnInit {
  constructor(
    private calculationService: CalculationService,
    private snackBarService: SnackbarService,
    private router: Router
  ) {
    const group: Group = {
      name: "Apt 101",
      count: 5,
      emails: ["prashantased@gmail.com"],
      names: ["Prashant Sedhain"],
    };
    console.log(group);
  }
  enableButton: boolean = false;
  selected: Number;
  list: number[] = [];
  numberSelected: boolean;
  users: Person[] = [];
  singleUser: Person;
  nameArray: any = [];
  emailArray: any = [];

  emailFormControl = new FormControl("", [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();
  ngOnInit() {}

  public createArray() {
    this.numberSelected = true;
    this.list = [];
    for (let i = 0; i < this.selected; i++) {
      this.list.push(1);
    }
    return this.list;
  }

  isValid() {
    for (let i = 0; i < this.selected; i++) {
      if (this.emailArray[i] == null || this.emailArray[i] == "") {
        console.log("Email is " + this.emailArray[i]);
        return false;
      }
      if (this.nameArray[i] == null || this.nameArray[i] == "") {
        return false;
      }
    }

    return true;
  }

  addUser() {
    if (this.isValid() == false) {
      this.snackBarService.openSnackBar(
        "All fields must be completed: ",
        "Error"
      );
    } else {
      for (let i = 0; i < this.nameArray.length; i++) {
        const singleUser: Person = {
          fullName: this.nameArray[i],
          email: this.emailArray[i],
          owes: {},
        };
        this.users.push(singleUser);
      }
      this.calculationService.emailArray = this.emailArray;
      this.calculationService.users = this.users;
      this.router.navigate(["/inputPage"]);
    }
  }
}
