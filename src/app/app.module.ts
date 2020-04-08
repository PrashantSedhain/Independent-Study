import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NavigationHeaderComponent } from "./navigation-header/navigation-header.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
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
import { FirstPageComponent } from "./first-page/first-page.component";
import { InputPageComponent } from "./input-page/input-page.component";
import { FinishPageComponent } from './finish-page/finish-page.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationHeaderComponent,
    SplitPageComponent,
    FirstPageComponent,
    InputPageComponent,
    FinishPageComponent,
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
