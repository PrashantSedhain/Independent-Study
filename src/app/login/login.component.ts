import { Component, OnInit, OnDestroy } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from "@angular/forms";
import { Subscription } from "rxjs";
import { AuthService } from "../Auth/auth.service";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  signinForm: FormGroup;
  errorMessage: string;
  userAuthenticated = false;
  private authStatusSub: Subscription;
  test: object;

  error_messages = {
    email: [
      { type: "required", message: "Email is required!" },
      { type: "pattern", message: "Email must be valid!" },
    ],
    password: [{ type: "required", message: "Please enter your password!" }],
  };

  onSubmit() {
    console.log(this.signinForm.value.email);
    this.authService.login(
      this.signinForm.value.email,
      this.signinForm.value.password
    );
  }

  constructor(
    private _snackBar: MatSnackBar,
    public authService: AuthService,
    public formBuilder: FormBuilder
  ) {
    this.signinForm = this.formBuilder.group({
      email: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          ,
          Validators.pattern(
            /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/
          ),
        ])
      ),
      password: new FormControl("", Validators.compose([Validators.required])),
    });
  }
  get f() {
    return this.signinForm.controls;
  }
  ngOnInit() {
    this.authStatusSub = this.authService
      .getAuthStatusListner()
      .subscribe((authStatus) => {
        this.openSnackBar();
      });
  }
  openSnackBar() {
    let currentUser;
    this.authService.getcurrentUserDetails().subscribe((data) => {
      currentUser = data;
      this._snackBar.open(
        "Welcome back " +
          currentUser.firstName +
          " " +
          currentUser.lastName +
          "!",
        "Okay",
        {
          duration: 2000,
        }
      );
    });
  }
  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
