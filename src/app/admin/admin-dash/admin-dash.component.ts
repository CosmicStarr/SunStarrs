import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IBrand } from 'src/app/Models/Brand';
import { ICategory } from 'src/app/Models/Category';
import { IProducts } from 'src/app/Models/Products';
import { ProductService } from 'src/app/_services/product.service';
import { environment } from 'src/environments/environment';
import { FileUploader } from 'ng2-file-upload';
import { AccountService } from 'src/app/account/account.service';
import { IUser } from 'src/app/Models/User';
import { take } from 'rxjs/operators';


@Component({
  selector: 'app-admin-dash',
  templateUrl: './admin-dash.component.html',
  styleUrls: ['./admin-dash.component.scss']
})
export class AdminDashComponent implements OnInit {
  brand:IBrand[] 
  category:ICategory[]
  products:IProducts
  user:IUser
  uploader: FileUploader
  hasBaseDropZone = false
  baseUrl = environment.baseUrl
  productForm:FormGroup
  photoForm:FormGroup
  constructor(private product:ProductService,private formbuilder:FormBuilder,private route:ActivatedRoute, private account:AccountService) { 
    this.account.currentUser$.pipe(take(1)).subscribe(results => this.user = results)
  }

  ngOnInit(): void {
    this.initializeUpload()
    this.loadProduct()
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
      // photoDTO:this.formbuilder.control('',Validators.required),
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

  fileOverDropZone(e:any){
    this.hasBaseDropZone = e
  }

  initializeUpload(){
    this.uploader = new FileUploader({
      url: this.baseUrl +'CreateItems/Add-Photo/'+this.route.snapshot.paramMap.get('id'), 
      authToken: 'Bearer ' + this.user.token,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload:true,
      autoUpload:false,
      maxFileSize: 10 * 1024 * 1024,
    })
    this.uploader.onAfterAddingFile = (file)=>{
      file.withCredentials = false;
    }
    this.uploader.onSuccessItem = (item, response, status, header ) =>{
      if(response){
        console.log(response)
        console.log(status)
        const photo = JSON.parse(response)
        this.products.photosDTO = photo
      }
    }
  }



  imgSubmit(){
    this.product.postImage(this.products.productsId,this.photoForm.value).subscribe((results)=>{
      console.log(this.products.productsId)
      console.log(this.photoForm.value)
      console.log(results)
    })
  } 

  loadProduct(){
    this.product.getProduct(+this.route.snapshot.paramMap.get('id')).subscribe((results)=>{
      this.products = results
      this.productForm.patchValue(this.products)
      console.log(results)
    },error =>{
      console.log(error)
    })
  }

  onSubmit(){
    this.product.putProduct(this.products.productsId,this.productForm.value).subscribe((results)=>{
      console.log(results)
    },error =>{
      console.log(error)
    })
  }

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
