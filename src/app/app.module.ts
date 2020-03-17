import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NavigationHeaderComponent } from "./navigation-header/navigation-header.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatFormFieldModule } from "@angular/material";
import { MatInputModule } from "@angular/material";
import { MatRippleModule } from "@angular/material";
import { MatButtonModule } from "@angular/material";
import { MatOptionModule } from "@angular/material";
import { MatSelectModule } from "@angular/material";
import { SplitPageComponent } from "./split-page/split-page.component";
import { FirstPageComponent } from "./first-page/first-page.component";
import { UserInfoComponent } from "./user-info/user-info.component";
import { InputPageComponent } from './input-page/input-page.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationHeaderComponent,
    SplitPageComponent,
    FirstPageComponent,
    UserInfoComponent,
    InputPageComponent
  ],
  imports: [
    BrowserModule,
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
    BrowserAnimationsModule
  ],
  exports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
