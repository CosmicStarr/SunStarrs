import { ThrowStmt } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProducts } from 'src/app/Models/Products';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  products?:IProducts
  amount = 0
  constructor(private productService:ProductService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.loadProduct()
  }

  loadProduct(){
    this.productService.getProduct(+this.route.snapshot.paramMap.get('id')).subscribe((results)=>{
      this.products = results
    },error =>{
      console.log(error)
    })
  }

  incrementAmount(){
    this.amount++
  }
  decrementAmount(){
    this.amount--
  }


}
