import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IBrand } from 'src/app/Models/Brand';
import { ICategory } from 'src/app/Models/Category';
import { IProducts } from 'src/app/Models/Products';
import { ProductService } from 'src/app/_services/product.service';


@Component({
  selector: 'app-admin-dash',
  templateUrl: './admin-dash.component.html',
  styleUrls: ['./admin-dash.component.scss']
})
export class AdminDashComponent implements OnInit {
  brand:IBrand[] 
  category:ICategory[]
  products:IProducts
  productForm:FormGroup
  catgoryForm:FormGroup
  brandForm:FormGroup
  constructor(private product:ProductService,private formbuilder:FormBuilder) { }

  ngOnInit(): void {
    // this.postProductForm()
    this.oncateSelected()
    this.onbrandSelected()
    this.productForm = this.formbuilder.group({
      name:this.formbuilder.control('',Validators.required),
      description:this.formbuilder.control('',Validators.required),
      price:this.formbuilder.control('',Validators.required),
      isOnSale:this.formbuilder.control('',Validators.required),
      isAvailable:this.formbuilder.control('',Validators.required),
      categoryDTO:this.formbuilder.control('',Validators.required),
      brandDTO:this.formbuilder.control('',Validators.required),
      // Form:this.formbuilder.array([
      //   this.catgoryForm = this.formbuilder.group({
      //     name:this.formbuilder.control('',Validators.required),
      //     description:this.formbuilder.control('',Validators.required)
      //   }),
      //   this.brandForm = this.formbuilder.group({
      //     name:this.formbuilder.control('',Validators.required)
      //   })
      // ])
    })
  }
  onSubmit(){
    this.product.postProduct(this.productForm.value).subscribe((results)=>{
      
      console.log(results)
    },error =>{
      console.log(error)
    })
  }

  // postProductForm(){
  //   this.productForm = this.formbuilder.group({
  //     name:this.formbuilder.control('',Validators.required),
  //     description:this.formbuilder.control('',Validators.required),
  //     price:this.formbuilder.control('',Validators.required),
  //     isOnSale:this.formbuilder.control('',Validators.required),
  //     isAvailable:this.formbuilder.control('',Validators.required),
  //     Form:this.formbuilder.array([
  //       this.catgoryForm = this.formbuilder.group({
  //         category:this.formbuilder.control('',Validators.required),
  //         description:this.formbuilder.control('',Validators.required)
  //       }),
  //       this.brandForm = this.formbuilder.group({
  //         brand:this.formbuilder.control('',Validators.required)
  //       })
  //     ])
  //   })
  // }

  // postImageForm(){
  //   this.imageForm = new FormGroup({
  //     photoDTO:new FormControl('',Validators.required)
  //   })
  // }

  // imgSubmit(id:number){
  //   this.product.getProducts(null).subscribe(results =>{
  //     this.products = results.result
  //     this.product.postImage(id,this.imageForm.value)
  //   })
  // } 


 

  oncateSelected(){
    this.product.getCategory().subscribe((results)=>{
    this.category = results
    })
  }

  onbrandSelected(){
    this.product.getBrands().subscribe(results =>{
      this.brand = results
    })
  }
}
