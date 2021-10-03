import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountService } from '../account/account.service';
import { IShoppingCart } from '../Models/ShoppingCart';
import { IUser } from '../Models/User';
import { ShoppingCartService } from '../_services/shopping-cart.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  ShoppingCart$:Observable<IShoppingCart>
  currentUser$:Observable<IUser>
  showMenu = true
  constructor(private account:AccountService,private CartService:ShoppingCartService) { }

  ngOnInit(): void {
    this.ShoppingCart$ = this.CartService.ShoppingCart$
    this.currentUser$ = this.account.currentUser$
  }

  isManager():boolean{
    return this.account.user.role === 'Manager'? true : false;
  }

  isAdmin():boolean{
    return this.account.user.role === 'Admin'? true : false;
  }

}
