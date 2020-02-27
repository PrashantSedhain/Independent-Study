import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SplitPageComponent } from './split-page/split-page.component';
import { FirstPageComponent } from './first-page/first-page.component';


const routes: Routes = [
  { path: 'splitPage', component: SplitPageComponent },
  {path: 'firstPage', component: FirstPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
