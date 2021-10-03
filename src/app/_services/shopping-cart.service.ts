import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IProducts } from '../Models/Products';
import { IShoppingCart, IShoppingCartItems, IShoppingCartTotals, ShoppingCart } from '../Models/ShoppingCart';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  baseUrl = environment.baseUrl
  private ShoppingCartSource = new BehaviorSubject<IShoppingCart>(null)
  ShoppingCart$ = this.ShoppingCartSource.asObservable()

  private ShoppingCartTotalSource = new BehaviorSubject<IShoppingCartTotals>(null)
  ShoppingCartTotal$ = this.ShoppingCartTotalSource.asObservable()
  shipping = 0
  constructor(private http:HttpClient) { }


  getShoppingCart(Id:string){
    return this.http.get(this.baseUrl + 'ShoppingCart?id=' + Id)
    .pipe(
      map((Cart?:IShoppingCart) =>{
          this.ShoppingCartSource.next(Cart)
          this.calcualteTotals()
          console.log(this.cartValue())
      })
    );
  }



  setShoppingCart(Cart:IShoppingCart){
    return this.http.post<IShoppingCart>(this.baseUrl + 'ShoppingCart', Cart).subscribe((result:IShoppingCart) =>{
      this.ShoppingCartSource.next(result);
      this.calcualteTotals();
      console.log(result);
    },error =>{
      console.log(error);
    })
  }

  cartValue(){
    return this.ShoppingCartSource.value;
  }

  addToCart(item:IProducts, amount = 1){
    const itemToAdd:IShoppingCartItems = this.mappedCart(item,amount)
    const ShoppingCart = this.cartValue() ?? this.createACart()
    ShoppingCart.shoppingCartItems = this.addOrUpdateItems(ShoppingCart.shoppingCartItems,itemToAdd,amount)
    this.setShoppingCart(ShoppingCart)
  }

  increment(item:IShoppingCartItems){
    const Cart = this.cartValue()
    const objtofind = Cart.shoppingCartItems.findIndex(x => x.productId === item.productId)
    Cart.shoppingCartItems[objtofind].amount++;
    this.setShoppingCart(Cart);
  }

  decrement(item:IShoppingCartItems){
    const Cart = this.cartValue()
    const objtofind = Cart.shoppingCartItems.findIndex(x => x.productId === item.productId)
    if(Cart.shoppingCartItems[objtofind].amount > 1){
      Cart.shoppingCartItems[objtofind].amount--;
      this.setShoppingCart(Cart);
    }else{
      this.removeItem(item)
    }
   
  }

  removeItem(item: IShoppingCartItems) {
    const Cart = this.cartValue()
    if(Cart.shoppingCartItems.some(x => x.productId === item.productId)){
      Cart.shoppingCartItems = Cart.shoppingCartItems.filter(x => x.productId !== item.productId)
      if(Cart.shoppingCartItems.length > 0){
        this.setShoppingCart(Cart)
      }else{
        this.deleteCart(Cart)
      }  
    }
  }

  deletelocalCart(id:string){
    this.ShoppingCartSource.next(null)
    this.ShoppingCartTotalSource.next(null)
    localStorage.removeItem('ShoppingCart_id')
  }

  deleteCart(Cart: IShoppingCart) {
    return this.http.delete(this.baseUrl + 'ShoppingCart?Id='+ Cart.shopId).subscribe(()=>{
      this.ShoppingCartTotalSource.next(null)
      this.ShoppingCartSource.next(null)
      localStorage.removeItem('ShoppingCart_id')
    },error => {
      console.log(error)
    })
  }

  //calulate shopping cart total
  private calcualteTotals(){
    const Cart = this.cartValue();
    const shipping = this.shipping;
    const subTotal = Cart.shoppingCartItems.reduce((a,b)=>(b.price * b.amount) + a,0);
    const total = shipping + subTotal;
    this.ShoppingCartTotalSource.next({shipping,subTotal,total});
  }

  private addOrUpdateItems(Items: IShoppingCartItems[], itemToAdd: IShoppingCartItems, amount: number): IShoppingCartItems[] {
    const index = Items.findIndex(x => x.productId === itemToAdd.productId)
    if(index === -1){
      itemToAdd.amount = amount
      Items.push(itemToAdd)
    }else{
      Items[index].amount += amount
    }
    return Items
  }
  
  private createACart(): IShoppingCart {
    const Cart = new ShoppingCart()
    localStorage.setItem('ShoppingCart_id',Cart.shopId)
    return Cart;
  }
  
  private mappedCart(item: IProducts, amount: number): IShoppingCartItems {
    return{
      productId:item?.productId,
      name:item?.name,
      imageUrl:item?.imageUrl,
      description:item?.description,
      price:item?.price,
      amount,
      category:item?.category,
      brand:item?.brand
    }
  }
}
