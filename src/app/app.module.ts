import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NavigationHeaderComponent } from "./navigation-header/navigation-header.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";

import {
  MatFormFieldModule,
  MatCheckboxModule,
  MatSnackBarModule,
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
import { TestComponent } from './test/test.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationHeaderComponent,
    SplitPageComponent,
    InputPageComponent,
    FinishPageComponent,
    LandingPageComponent,
    TestComponent,
  ],
  imports: [
    BrowserModule,
    MatCheckboxModule,
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
  ],
  exports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatSelectModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
