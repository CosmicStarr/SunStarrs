import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductsComponent } from './products/products.component';
import { DetailsComponent } from './products/details/details.component';
import { CardsComponent } from './products/cards/cards.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeFeaturesComponent } from './home/home-features/home-features.component';
import { FooterComponent } from './home/footer/footer.component';
import { SearchComponent } from './search/search.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ErrorComponent } from './error/error.component';
import { ServerErrorComponent } from './server-error/server-error.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { AuthInterceptorProvider } from './Interceptor/jwt.interceptor';
import { ErrorInterceptorProvider } from './Interceptor/error.interceptor';



@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    DetailsComponent,
    CardsComponent,
    NavBarComponent,
    HomeComponent,
    ShoppingCartComponent,
    OrderSummaryComponent,
    HomeFeaturesComponent,
    FooterComponent,
    SearchComponent,
    CheckoutComponent,
    ErrorComponent,
    ServerErrorComponent,
    NotfoundComponent,

  ],
  imports: [
    BrowserModule,
    BsDropdownModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    PaginationModule,
    NgbModule,
    Ng2SearchPipeModule
  ],
  providers: [
    AuthInterceptorProvider,
    ErrorInterceptorProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
