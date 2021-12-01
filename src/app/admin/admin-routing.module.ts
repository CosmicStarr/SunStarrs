import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAccountComponent } from '../account/user-account/user-account.component';
import { AdminDashComponent } from './admin-dash/admin-dash.component';
import { AdminEditComponent } from './admin-edit/admin-edit.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewProductComponent } from './new-product/new-product.component';


const routes: Routes = [
  {path:'admin-home',component:AdminHomeComponent,children: [
    {path:'edit',component:AdminEditComponent},
    {path:'new-product',component:NewProductComponent},
    {path:'dashboard',component:DashboardComponent},
    {path:'admin-dash/:id',component:AdminDashComponent},
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
