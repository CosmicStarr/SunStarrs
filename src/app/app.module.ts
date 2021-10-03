import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
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
    NgbModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
