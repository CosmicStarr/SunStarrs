import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IShoppingCart, IShoppingCartItems} from '../Models/ShoppingCart';
import { ShoppingCartService } from '../_services/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  ShoppingCart$:Observable<IShoppingCart>
  constructor(private CartService:ShoppingCartService) { }

  ngOnInit(): void {
    this.ShoppingCart$ = this.CartService.ShoppingCart$
  }

  removeItems(item:IShoppingCartItems){
    this.CartService.removeItem(item)
  }

  increment(item:IShoppingCartItems){
    this.CartService.increment(item)
  }

  decrement(item:IShoppingCartItems){
    this.CartService.decrement(item)
  }
}
