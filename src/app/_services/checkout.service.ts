import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IOrders } from '../Models/Orders';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  baseUrl = environment.baseUrl
  
  constructor(private http:HttpClient) { }
  header = new HttpHeaders({
    Authorization: 'Bearer ' + localStorage.getItem('token'),
  })

  orderToCreateOrder(order:IOrders){
    return this.http.post(this.baseUrl + 'Order',order,{headers: this.header})
  }
}
