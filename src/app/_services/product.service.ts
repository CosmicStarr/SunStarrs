import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IBrand } from '../Models/Brand';
import { ICategory } from '../Models/Category';
import { PaginatedResults } from '../Models/Pagination';
import { IProducts } from '../Models/Products';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl = environment.baseUrl
  PaginatedResult:PaginatedResults<IProducts[]> = new PaginatedResults<IProducts[]>()
  header = new HttpHeaders({
    Authorization: 'Bearer ' + localStorage.getItem('token'),
  })
  constructor(private http:HttpClient) { }

  getProducts(page?:number,ItemsPerPage?:number,TotalItems?:number){
    let params = new HttpParams
    if(page !== undefined && ItemsPerPage !==undefined){
      params = params.append('pageNumber',page.toString());
      params = params.append('pageSize',ItemsPerPage.toString());
      params = params.append('TotalItems',TotalItems.toString());
    }
    return this.http.get<IProducts[]>(this.baseUrl + 'Products',{ observe:'response', params, headers: this.header})
    .pipe(
      map(response =>{
        this.PaginatedResult.result = response.body;
        if(response.headers.get('Pagination') !== undefined){
          this.PaginatedResult.Pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return this.PaginatedResult
      })
    )
  }

  getProduct(id:number){
    return this.http.get<IProducts>(this.baseUrl + 'Products/'+ id)
  }

  getCategory(){
    return this.http.get<ICategory[]>(this.baseUrl + 'Products/Category')
  }

  getBrands(){
    return this.http.get<IBrand[]>(this.baseUrl + 'Products/Brand')
  }

}
