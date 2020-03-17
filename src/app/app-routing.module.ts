import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SplitPageComponent } from "./split-page/split-page.component";
import { FirstPageComponent } from "./first-page/first-page.component";
import { InputPageComponent } from './input-page/input-page.component';

const routes: Routes = [{ path: "splitPage", component: SplitPageComponent },
{ path: "inputPage", component: InputPageComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
