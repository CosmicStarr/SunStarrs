import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IBrand } from '../Models/Brand';
import { ICategory } from '../Models/Category';
import { IPagination } from '../Models/Pagination';
import { IProducts } from '../Models/Products';
import { SunParams } from '../Models/SunStarrParams';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  @ViewChild('Search',{static:true}) SearchBar:ElementRef
  brands:IBrand[] = []
  category:ICategory[]= []
  products:IProducts[]
  sunParams = new SunParams()
  sortOptions = [
    {name:'Alphabetical',value:'name'},
    {name:'Price Low to High',value:'priceAsc'},
    {name:'Price High to Low',value:'priceDsc'}
  ]
  p:IPagination;
  constructor(private productService:ProductService) { }

  ngOnInit(): void {
    this.getAllProducts();
    this.getAllCategory();
    this.getBrands();

  }

  getAllProducts(){
    this.productService.getProducts(this.sunParams).subscribe(results =>{
      this.products = results.result
      this.p = results.Pagination
    },error =>{
      console.log(error);
    })
  }

  onSortSelected(sort:string){
    this.sunParams.sort = sort
    this.getAllProducts()
  }
  pageChanged(event: any){
    this.sunParams.pageNumber = event.page;
    this.getAllProducts();
  }

  onCatSelected(CatId:number){
    this.sunParams.catId = CatId
    this.getAllProducts()
  }

  onBrandSelected(BrandId:number){
    this.sunParams.brandId = BrandId
    this.getAllProducts()
  }

  getAllCategory(){
    this.productService.getCategory().subscribe((results)=>{
      this.category = [{catId: 0, name: 'All'},...results]
    },error =>{
      console.log(error)
    })
  }

  onSearch(){
    this.sunParams.search = this.SearchBar.nativeElement.value
    this.getAllProducts()
  }
  onReset(){
    this.SearchBar.nativeElement.value = ''
    this.sunParams = new SunParams()
    this.getAllProducts()
  }
  /*the "..." spreads out the array of brands! Im adding a new brandId with a 
  value of zero and naming it "ALL" and then im adding the results of the array of brands*/
  getBrands(){
    this.productService.getBrands().subscribe((results)=>{
      this.brands = [{brandId: 0, name: 'All'},...results]
    },error =>{
      console.log(error)
    })
  }


  
}
