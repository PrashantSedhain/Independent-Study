import { Component, OnInit, OnDestroy } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from "@angular/forms";
import { Subscription } from "rxjs";
import { AuthService } from "../Auth/auth.service";
@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  private authStatusSub: Subscription;
  error_messages = {
    firstName: [{ type: "required", message: "First Name is required." }],

    lastName: [{ type: "required", message: "Last Name is required." }],

    email: [
      { type: "required", message: "Email is required." },
      { type: "pattern", message: "Email must be valid!" },
    ],

    password: [
      { type: "required", message: "Password is required." },
      {
        type: "minlength",
        message: "Passwords needs minimum of 6 characters!",
      },
      { type: "maxlength", message: "You can only have max of 30 characters!" },
    ],
    confirmpassword: [
      { type: "required", message: "Please confirm password!" },
      { type: "maxlength", message: "You can only have max of 30 characters!" },
    ],
    acceptTerms: [
      {
        type: "required",
        message: "Please check the terms and conditions!",
      },
    ],
  };

  constructor(
    public authService: AuthService,
    public formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
  ) {
    this.signupForm = this.formBuilder.group(
      {
        //   firstName: new FormControl(
        //     "",
        //     Validators.compose([Validators.required])
        //   ),
        //   lastName: new FormControl(
        //     "",
        //     Validators.compose([Validators.required])
        //   ),
        email: new FormControl(
          "",
          Validators.compose([
            Validators.required,
            Validators.pattern(
              /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/
            ),
          ])
        ),
        password: new FormControl(
          "",
          Validators.compose([
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(30),
          ])
        ),
        confirmpassword: new FormControl(
          "",
          Validators.compose([
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(30),
          ])
        ),
        acceptTerms: [false, Validators.requiredTrue],
      },
      {
        validators: this.password.bind(this),
      }
    );
  }

  ngOnInit() {
    this.authStatusSub = this.authService
      .getAuthStatusListner()
      .subscribe((authStatus) => {
        this.openSnackBar();
      });
  }
  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }

  password(formGroup: FormGroup) {
    const { value: password } = formGroup.get("password");
    const { value: confirmPassword } = formGroup.get("confirmpassword");
    return password === confirmPassword ? null : { passwordNotMatch: true };
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    this.authService.createUser(
      // this.signupForm.value.firstName,
      // this.signupForm.value.lastName,
      this.signupForm.value.email,
      this.signupForm.value.password
    );
  }

  openSnackBar() {
    let currentUser;
    this.authService.getcurrentUserDetails().subscribe((data) => {
      currentUser = data;
      this._snackBar.open(
        "Welcome " + currentUser.firstName + " " + currentUser.lastName + "!",
        "Okay",
        {
          duration: 2000,
        }
      );
    });
  }
}
