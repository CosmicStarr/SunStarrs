import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IBrand } from '../Models/Brand';
import { ICategory } from '../Models/Category';
import { PaginatedResults } from '../Models/Pagination';
import { IPhoto } from '../Models/Photos';
import { IProducts } from '../Models/Products';
import { SunParams } from '../Models/SunStarrParams';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl = environment.baseUrl
  PaginatedResult?:PaginatedResults<IProducts[]> = new PaginatedResults<IProducts[]>()
  header = new HttpHeaders({
    Authorization: 'Bearer ' + localStorage.getItem('token'),
  })
  constructor(private http:HttpClient) { }

  getProducts(sunParams?:SunParams){
    let params = new HttpParams
    if(sunParams?.sort){
      params = params.append('sort', sunParams.sort)
    }
    if(sunParams?.brandId){
      params = params.append('brandId',sunParams.brandId.toString())
    }
    if(sunParams?.catId){
      params = params.append('catId',sunParams.catId.toString())
    }
    if(sunParams?.search)
    {
      params = params.append('Search',sunParams.search)
    }
    if(sunParams?.pageNumber !== undefined && sunParams?.pageSize !==undefined){
      params = params.append('pageNumber',sunParams.pageNumber.toString());
      params = params.append('pageSize',sunParams.pageSize.toString());
      params = params.append('TotalItems',sunParams.TotalItems.toString()); 
    }
    return this.http.get<IProducts[]>(this.baseUrl + 'Products',{ observe:'response', params, headers: this.header})
    .pipe(
      map(response =>{
        console.log(response)
        this.PaginatedResult.result = response.body;
        if(response.headers.get('Pagination') !== undefined){
          this.PaginatedResult.Pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return this.PaginatedResult
      },(error: any)=>{
        console.log(error)
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

  postProduct(product:any){
    return this.http.post(this.baseUrl + 'CreateItems/CreateProduct', product)
  }

  postCategory(category:ICategory){
    return this.http.post<ICategory>(this.baseUrl + 'CreateItems/CreateCategory',category)
  }
  postImage(id:number,photos:IPhoto){
    return this.http.post<IPhoto>(this.baseUrl + 'CreateItems/AddPhoto'+ id, photos)
  }

}
