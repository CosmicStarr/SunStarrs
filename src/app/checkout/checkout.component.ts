import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IAddress } from '../Models/Address';
import { IDelivery } from '../Models/Delivery';
import { IShoppingCart } from '../Models/ShoppingCart';
import { CheckoutService } from '../_services/checkout.service';
import { ShoppingCartService } from '../_services/shopping-cart.service';
import { IOrders, OrderedItem } from '../Models/Orders';
import { IUser } from '../Models/User';
import { AccountService } from '../account/account.service';
import { map } from 'rxjs/operators';
declare var Stripe
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit, AfterViewInit,OnDestroy {
  delivery:IDelivery
  address:IAddress
  checkoutForm:FormGroup 
  paymentForm:FormGroup
  amount:OrderedItem
  
  constructor(private checkoutService:CheckoutService,private Cart:ShoppingCartService,private account:AccountService) { }
  @ViewChild('cardNumber',{static:true}) cardNumberElement: ElementRef
  @ViewChild('cardExpiry',{static:true}) cardExpiryElement: ElementRef
  @ViewChild('cardCvc',{static:true}) cardCvcElement: ElementRef

  stripe:any;
  cardCvc:any;
  cardExpiry:any;
  cardNumber:any;
  cardError:any;
  cardHandler = this.onChange.bind(this);
  loading = false;
  cardNumberValid = false;
  cardExpiryValid = false;
  cardCVCValid = false;
  ngOnInit(): void {
    this.createForm()
    this.getUserAddress()
    this.createPaymentForm()
  }
  ngAfterViewInit(){
    this.stripe = Stripe('pk_test_51JjtO5F0pfFIlxfwQ69mIRu6NH34lX2vw86F6fXpXRWIBcfYynd7rB8IODhgYE09J1rDBy4DuUzuDX2nd4HwMst300Je0Qkio6');
    const elements = this.stripe.elements();

    this.cardNumber = elements.create('cardNumber');
    this.cardNumber.mount(this.cardNumberElement.nativeElement); 
    this.cardNumber.addEventListener('change',this.cardHandler);

    this.cardCvc = elements.create('cardCvc');
    this.cardCvc.mount(this.cardCvcElement.nativeElement); 
    this.cardCvc.addEventListener('change',this.cardHandler);

    this.cardExpiry = elements.create('cardExpiry');
    this.cardExpiry.mount(this.cardExpiryElement.nativeElement); 
    this.cardExpiry.addEventListener('change',this.cardHandler);
  }
  ngOnDestroy(){
    this.cardNumber.destroy();
    this.cardCvc.destroy();
    this.cardExpiry.destroy();
  }

  onChange(event){
    if(event.error){
      this.cardError = event.error.message;
    }else{
      this.cardError = null;
    }
    switch (event.elementType) {
      case 'cardNumber':
        this.cardNumberValid = event.complete;
        break;
      case 'cardCvc':
        this.cardCVCValid = event.complete;
        break;
      case 'cardExpiry':
        this.cardExpiryValid = event.complete;
        break;
    }
  }
  createForm(){
    this.checkoutForm = new FormGroup({
      firstName: new FormControl('',Validators.required),
      lastName: new FormControl('',Validators.required),
      street: new FormControl('',Validators.required),
      city: new FormControl('',Validators.required),
      state: new FormControl('',Validators.required),
      zipCode: new FormControl('',Validators.required)
    })
  }

  createPaymentForm(){
    this.paymentForm = new FormGroup({
      nameOnCard: new FormControl('',Validators.required)
    })
  }

  async submitOrder(){
    this.loading = true;
    const Cart = this.Cart.cartValue();
    try {
      const actualOrder = await this.createOrder(Cart);
      console.log(actualOrder)
      const results = await this.confirmPayment(Cart);
      if(results.paymentIntent){
        console.log(results)
        this.Cart.deleteCart(Cart)
      }else{
        console.log(results);
      }
      this.loading = false
    } catch (error) {
      console.log(error);
      this.loading = false
    }

  }
  private async confirmPayment(Cart) {
    return this.stripe.confirmCardPayment(Cart.clientSecret, {
      payment_method:{
        card:this.cardNumber,
        billing_details:{
          name: this.paymentForm.get('nameOnCard').value
        }
      }
    })
  }

  private async createOrder(Cart: IShoppingCart) {
    const orderToCreate = this.getOrderToCreate(Cart);
    return this.checkoutService.orderToCreateOrder(orderToCreate).toPromise()
  }

  private getOrderToCreate(Cart: IShoppingCart) {
    return {
      cartId:Cart.shopId,
      specialDeliveryID: Cart.deliveryId,
      shiptoAddress: this.checkoutForm.value,
    }
  }

  getUserAddress(){
    this.account.getUserAddress().subscribe(results =>{
      if(results){
        this.checkoutForm.patchValue(results)
      }
    })
  }
  saveUserAddress(){
    this.account.updateUserAddress(this.checkoutForm.value)
    .subscribe(()=>{
      console.log(this.checkoutForm.value)
    },error=>{
      console.log(error);
    });
      
  }
}
