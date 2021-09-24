import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './products/details/details.component';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
  {path:'account', loadChildren:()=>import('./account/account.module').then(mod =>mod.AccountModule)},
  {path:'',component:HomeComponent,pathMatch:"full"},
  {path:'products',component:ProductsComponent},
  {path:'products/:id',component:DetailsComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
