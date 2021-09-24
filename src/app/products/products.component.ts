import { Component, OnInit } from '@angular/core';
import { IBrand } from '../Models/Brand';
import { ICategory } from '../Models/Category';
import { IPagination } from '../Models/Pagination';
import { IProducts } from '../Models/Products';
import { ShopParams } from '../Models/ShopParams';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  brands:IBrand[] = []
  category:ICategory[]= []
  products:IProducts[]
  shopParams = new ShopParams();
  p:IPagination;
  pageNumber = 1
  pageSize = 12
  // TotalItems:number
  TotalItems = 50
  constructor(private productService:ProductService) { }

  ngOnInit(): void {
    this.getAllProducts();
    this.getAllCategory();
    this.getBrands();
  }

  getAllProducts(){
    this.productService.getProducts(this.pageNumber,this.pageSize,this.TotalItems).subscribe(results =>{
      this.products = results.result
      this.p = results.Pagination
    },error =>{
      console.log(error);
    })
  }
  pageChanged(event: any){
    this.pageNumber = event.page;
    this.getAllProducts();
  }

  getAllCategory(){
    this.productService.getCategory().subscribe((results)=>{
      this.category = results
    },error =>{
      console.log(error)
    })
  }

  getBrands(){
    this.productService.getBrands().subscribe((results)=>{
      this.brands = results
    },error =>{
      console.log(error)
    })
  }

}
