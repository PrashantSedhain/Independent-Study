import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormGroup,
} from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";
import { CalculationService } from "../calculation.service";
import { SnackbarService } from "../snackbar.service";
import { Router } from "@angular/router";
import { GroupService } from "../group.service";
import { AuthService } from "../Auth/auth.service";
import { groupBy } from "lodash";

interface Test {
  userID: string;
}

interface Group {
  userId: String;
  groupName: String;
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
  groupForm: FormGroup;
  default: any;
  numbers: Array<Number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  constructor(
    private calculationService: CalculationService,
    private snackBarService: SnackbarService,
    private router: Router,
    private groupService: GroupService,
    private authService: AuthService
  ) {
    this.groupForm = new FormGroup({
      numOfPeople: new FormControl(null),
    });
  }
  groupByID: Group;
  ListOfGroups: Array<Group>;
  userId: Test;
  enableButton: boolean = false;
  selected: Number;
  list: number[] = [];
  numberSelected: boolean;
  users: Person[] = [];
  singleUser: Person;
  nameArray: any = [];
  emailArray: any = [];
  loading: boolean;
  emailFormControl = new FormControl("", [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();
  ngOnInit() {
    this.loading = true;
    var groupData = this.groupService.findGroups();
    groupData.subscribe((data) => {
      this.ListOfGroups = data.data;
      this.loading = false;
    });

    this.groupForm.controls["numOfPeople"].valueChanges.subscribe((value) => {
      this.selected = value;
      console.log(value);
      this.createArray();
    });
  }

  public createArray() {
    this.numberSelected = true;
    this.selected = this.groupForm.get("numOfPeople").value;
    this.list = [];
    for (let i = 0; i < this.selected; i++) {
      this.list.push(1);
    }
    return this.list;
  }

  isValid() {
    for (let i = 0; i < this.selected; i++) {
      if (this.emailArray[i] == null || this.emailArray[i] == "") {
        return false;
      }
      if (this.nameArray[i] == null || this.nameArray[i] == "") {
        return false;
      }
    }

    return true;
  }

  createGroup() {
    var data = this.authService.getCurrentUserID();
    const id = data["id"];
    const group: Group = {
      userId: id,
      groupName: "Apt 101",
      count: this.emailArray.length,
      emails: this.emailArray,
      names: this.nameArray,
    };
    var jsonBody = JSON.stringify(group);
    this.groupService.createGroup(jsonBody);
  }

  findGroupByID(groupID) {
    var groupData = this.groupService.findGroupByID(groupID);
    this.loading = true;
    groupData.subscribe((data) => {
      this.groupByID = data.data;
      this.groupForm.controls["numOfPeople"].setValue(this.groupByID.count, {
        onlySelf: true,
      });
      this.createArray();
      this.loading = false;
    });
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
      this.userId = this.authService.getCurrentUserID();
      this.router.navigate(["/inputPage"]);
    }
  }
}
