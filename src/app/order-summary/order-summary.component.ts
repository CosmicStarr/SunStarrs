import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IShoppingCartTotals } from '../Models/ShoppingCart';
import { ShoppingCartService } from '../_services/shopping-cart.service';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss']
})
export class OrderSummaryComponent implements OnInit {
  ShoppingCartTotal$:Observable<IShoppingCartTotals>
  constructor(private CartService:ShoppingCartService) { }

  ngOnInit(): void {
    this.ShoppingCartTotal$ = this.CartService.ShoppingCartTotal$
  }



}
