import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NavigationHeaderComponent } from "./navigation-header/navigation-header.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import {
  MatFormFieldModule,
  MatCheckboxModule,
  MatSnackBarModule,
  MatSelectionList,
  MatListModule,
  MatProgressBarModule,
} from "@angular/material";
import { MatInputModule } from "@angular/material";
import { MatRippleModule } from "@angular/material";
import { MatButtonModule } from "@angular/material";
import { MatOptionModule } from "@angular/material";
import { MatSelectModule } from "@angular/material";
import { SplitPageComponent } from "./split-page/split-page.component";
import { InputPageComponent } from "./input-page/input-page.component";
import { FinishPageComponent } from "./finish-page/finish-page.component";
import { LandingPageComponent } from "./landing-page/landing-page.component";
import { SignupComponent } from "./signup/signup.component";
import { AuthInterceptor } from "./Auth/auth-interceptor";
import { LoginComponent } from "./login/login.component";
import { ProfilePageComponent } from "./profile-page/profile-page.component";

@NgModule({
  declarations: [
    AppComponent,
    NavigationHeaderComponent,
    SplitPageComponent,
    InputPageComponent,
    FinishPageComponent,
    LandingPageComponent,
    LoginComponent,
    SignupComponent,
    ProfilePageComponent,
  ],
  imports: [
    BrowserModule,
    MatCheckboxModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatOptionModule,
    HttpClientModule,
    MatSelectModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    MatListModule,
    MatProgressBarModule,
  ],
  exports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatSelectModule,
    MatListModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
