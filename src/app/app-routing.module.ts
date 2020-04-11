import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SplitPageComponent } from "./split-page/split-page.component";
import { InputPageComponent } from "./input-page/input-page.component";
import { FinishPageComponent } from "./finish-page/finish-page.component";
import { LandingPageComponent } from "./landing-page/landing-page.component";

const routes: Routes = [
  { path: "splitPage", component: SplitPageComponent },
  { path: "", component: LandingPageComponent },
  { path: "inputPage", component: InputPageComponent },
  { path: "finishPage", component: FinishPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
