import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  NgForm,
  Validators,
  FormGroup,
  FormArray,
  FormBuilder,
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

interface Member {
  name: string;
  email: string;
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

@Component({
  selector: "app-split-page",
  templateUrl: "./split-page.component.html",
  styleUrls: ["./split-page.component.css"],
})
export class SplitPageComponent implements OnInit {
  memberData: Array<Member>;
  submitted = false;
  groupForm: FormGroup;
  default: any;
  numbers: Array<Number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  constructor(
    private calculationService: CalculationService,
    private snackBarService: SnackbarService,
    private router: Router,
    private groupService: GroupService,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {}
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

  ngOnInit() {
    this.groupForm = this.formBuilder.group({
      numOfPeople: ["", Validators.required],
      members: new FormArray([]),
    });

    this.loading = true;
    var groupData = this.groupService.findGroups();
    groupData.subscribe((data) => {
      this.ListOfGroups = data.data;
      this.loading = false;
    });

    this.groupForm.controls["numOfPeople"].valueChanges.subscribe((value) => {
      this.selected = value;
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
  get t() {
    return this.groupForm.controls.members as FormArray;
  }

  get f() {
    return this.groupForm.controls;
  }

  createGroup() {
    var data = this.authService.getCurrentUserID();
    const id = data["id"];
    const group: Group = {
      userId: id,
      groupName: "Hawa Design",
      count: this.selected,
      emails: this.emailArray,
      names: this.nameArray,
    };
    var jsonBody = JSON.stringify(group);
    this.groupService.createGroup(jsonBody);
  }

  onReset() {
    // reset whole form back to initial state
    this.submitted = false;
    this.groupForm.reset();
    this.t.clear();
  }

  onClear() {
    // clear errors and reset ticket fields
    this.submitted = false;

    this.t.reset();
  }
  onChangeTickets(e) {
    const numberOfTickets = e.target.value || 0;
    this.selected = numberOfTickets;
    if (this.t.length < numberOfTickets) {
      for (let i = this.t.length; i < numberOfTickets; i++) {
        this.t.push(
          this.formBuilder.group({
            name: ["", Validators.required],
            email: ["", [Validators.required, Validators.email]],
          })
        );
      }
    } else {
      for (let i = this.t.length; i >= numberOfTickets; i--) {
        this.t.removeAt(i);
      }
    }
  }

  findGroupByID(groupID) {
    this.onReset();
    var groupData = this.groupService.findGroupByID(groupID);
    this.loading = true;
    groupData.subscribe((data) => {
      this.groupByID = data.data;
      this.groupForm.controls["numOfPeople"].setValue(this.groupByID.count, {
        onlySelf: true,
      });

      if (this.t.length < this.groupByID.count) {
        this.emailArray = this.groupByID.emails;
        this.nameArray = this.groupByID.names;
        for (let i = this.t.length; i < this.groupByID.count; i++) {
          if (this.t.length < this.groupByID.count) {
            this.t.push(
              this.formBuilder.group({
                name: [this.nameArray[i], Validators.required],
                email: [
                  this.emailArray[i],
                  [Validators.required, Validators.email],
                ],
              })
            );
          }
        }
      } else {
        for (let i = this.t.length; i >= this.groupByID.count; i--) {
          this.t.removeAt(i);
        }
      }
      this.loading = false;
    });
  }

  onSubmit() {
    if (this.groupForm.invalid) {
      alert("Form is invalid");
      return;
    }
    // this.createGroup();
    this.parseForm();
    this.addUser();
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

  parseForm() {
    this.memberData = this.groupForm.get("members").value;
    for (let i = 0; i < this.memberData.length; i++) {
      this.nameArray[i] = this.memberData[i].name;
      this.emailArray[i] = this.memberData[i].email;
    }
  }
}
