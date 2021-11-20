import { Component, OnInit } from '@angular/core';
import { AccountService } from './account/account.service';
import { IUser } from './Models/User';
import { ShoppingCartService } from './_services/shopping-cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'SunStarrs';

  constructor( private Cart:ShoppingCartService,private accountService:AccountService){}
  ngOnInit(): void {
    const CartId = localStorage.getItem('ShoppingCart_id');
    if(CartId){
      this.Cart.getShoppingCart(CartId).subscribe(()=>{
        console.log('Initialized Shopping Cart! ')
      },error =>{
        console.log(error)
      })
    }
    this.setCurrentUser()
  }


  setCurrentUser(){
    const user: IUser = JSON.parse(localStorage.getItem('user'));
    if(user){
      this.accountService.setCurrentUser(user);
    }
    
  }

}
