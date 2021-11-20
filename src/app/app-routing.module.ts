import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './account/auth.guard';
import { CheckoutComponent } from './checkout/checkout.component';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { DetailsComponent } from './products/details/details.component';
import { ProductsComponent } from './products/products.component';
import { SearchComponent } from './search/search.component';
import { ServerErrorComponent } from './server-error/server-error.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

const routes: Routes = [
  {path:'account', loadChildren:()=>import('./account/account.module').then(mod =>mod.AccountModule)},
  {path:'admin', loadChildren:()=>import('./admin/admin.module').then(mod =>mod.AdminModule)},
  {path:'',component:HomeComponent,pathMatch:"full"},
  {path:'products',component:ProductsComponent,canActivate:[AuthGuard]},
  {path:'products/:id',component:DetailsComponent},
  {path:'cart',component:ShoppingCartComponent},
  {path:'search',component:SearchComponent},
  {path:'checkout',component:CheckoutComponent,canActivate:[AuthGuard]},
  {path:'error',component:ErrorComponent},
  {path:'servererror',component:ServerErrorComponent},
  {path:'notfound',component:NotfoundComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
