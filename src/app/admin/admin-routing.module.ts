import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashComponent } from './admin-dash/admin-dash.component';
import { AdminEditComponent } from './admin-edit/admin-edit.component';

const routes: Routes = [
  {path:'admin-dash',component:AdminDashComponent},
  {path:'admin-edit',component:AdminEditComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
