import { Component, OnInit } from '@angular/core';
import { AccountService } from './account/account.service';
import { ShoppingCartService } from './_services/shopping-cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'SunStarrs';

  constructor( private Cart:ShoppingCartService){}
  ngOnInit(): void {
    const CartId = localStorage.getItem('shoppingCart_Id');
    if(CartId){
      this.Cart.getShoppingCart(CartId).subscribe(()=>{
        console.log('Initialized Shopping Cart! ')
      },error =>{
        console.log(error)
      })
    }
   
  }
  

}
