import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { IDelivery } from '../Models/Delivery';
import { IShoppingCart, IShoppingCartItems} from '../Models/ShoppingCart';
import { ShoppingCartService } from '../_services/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  delivery?:IDelivery[]=[]
  ShoppingCart$:Observable<IShoppingCart>
  deliveryInput:FormGroup
  constructor(private CartService:ShoppingCartService) {
    
   }

  ngOnInit(): void {
    this.ShoppingCart$ = this.CartService.ShoppingCart$
 
    this.deliveryForm()
    this.getDeliveries()
  }

  paymentIntent(){
    return this.CartService.createPaymentIntent().subscribe(() =>{

    },error =>{
      console.log(error)
    })
  }
  deliveryForm(){
    this.deliveryInput = new FormGroup({
      deli:new FormControl('',Validators.required)
    })
  }

  getdeliveryValue(){
    const Cart = this.CartService.cartValue()
    if(Cart?.deliveryId !== undefined){
      this.deliveryInput.get('deli').patchValue(Cart.deliveryId?.toString());
    }
  }

  setDeliveryValue(deli:IDelivery){
    this.CartService.getShippingValue(deli)
    this.getdeliveryValue()
  }

  getDeliveries(){
    this.CartService.getDelivery().subscribe((results:IDelivery[])=>{
      this.delivery = results
    },error =>{
      console.log()
    })
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
