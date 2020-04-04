import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators
} from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";
import { CalculationService } from "../calculation.service";

interface OweTable {
  owes: Record<string, Number>;
}

interface Person {
  fullName: string;
  email: string;
  owes: OweTable[];
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
  styleUrls: ["./split-page.component.css"]
})
export class SplitPageComponent implements OnInit {
  constructor(private calculationService: CalculationService) {}
  selected: Number;
  list: number[] = [];
  test: boolean;
  users: Person[] = [];
  singleUser: Person;
  nameArray: any = [];
  emailArray: any = [];

  emailFormControl = new FormControl("", [
    Validators.required,
    Validators.email
  ]);

  matcher = new MyErrorStateMatcher();
  ngOnInit() {}

  public createArray() {
    this.test = true;
    this.list = [];
    if (this.selected == 1) {
      this.list.push(1);
      return this.list;
    }
    if (this.selected == 2) {
      this.list.push(1);
      this.list.push(1);
      return this.list;
    }
    if (this.selected == 3) {
      this.list.push(1);
      this.list.push(1);
      this.list.push(1);
      return this.list;
    }
    if (this.selected == 4) {
      this.list.push(1);
      this.list.push(1);
      this.list.push(1);
      this.list.push(1);
      return this.list;
    }
    if (this.selected == 5) {
      this.list.push(1);
      this.list.push(1);
      this.list.push(1);
      this.list.push(1);

      this.list.push(1);
      return this.list;
    }
    if (this.selected == 6) {
      this.list.push(1);
      this.list.push(1);
      this.list.push(1);
      this.list.push(1);
      this.list.push(1);
      this.list.push(1);
      return this.list;
    }
  }

  addUser() {
    for (let i = 0; i < this.nameArray.length; i++) {
      const singleUser: Person = {
        fullName: this.nameArray[i],
        email: this.emailArray[i],
        owes: []
      };
      this.users.push(singleUser);
    }

    this.nameArray = [];
    this.emailArray = [];
    this.calculationService.users = this.users;
    console.log(this.calculationService.newPerson);
  }
}
