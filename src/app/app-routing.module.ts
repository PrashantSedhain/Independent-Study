import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SplitPageComponent } from "./split-page/split-page.component";
import { InputPageComponent } from "./input-page/input-page.component";
import { FinishPageComponent } from "./finish-page/finish-page.component";
import { LandingPageComponent } from "./landing-page/landing-page.component";
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";
import { AuthGuard } from "./Auth/auth.guard";

const routes: Routes = [
  {
    path: "splitPage",
    component: SplitPageComponent,
    canActivate: [AuthGuard],
  },
  { path: "", component: LandingPageComponent },
  {
    path: "inputPage",
    component: InputPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "finishPage",
    component: FinishPageComponent,
    canActivate: [AuthGuard],
  },
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignupComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
