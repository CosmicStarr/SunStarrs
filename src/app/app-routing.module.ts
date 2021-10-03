import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './products/details/details.component';
import { ProductsComponent } from './products/products.component';
import { SearchComponent } from './search/search.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

const routes: Routes = [
  {path:'account', loadChildren:()=>import('./account/account.module').then(mod =>mod.AccountModule)},
  {path:'',component:HomeComponent,pathMatch:"full"},
  {path:'products',component:ProductsComponent},
  {path:'products/:id',component:DetailsComponent},
  {path:'cart',component:ShoppingCartComponent},
  {path:'search',component:SearchComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
