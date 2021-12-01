import { ThrowStmt } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProducts } from 'src/app/Models/Products';
import { ProductService } from 'src/app/_services/product.service';
import { ShoppingCartService } from 'src/app/_services/shopping-cart.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  products:IProducts
  amount = 0
  constructor(private productService:ProductService, private route:ActivatedRoute, private CartService:ShoppingCartService) { }

  ngOnInit(): void {
    this.loadProduct()
  }

  loadProduct(){
    this.productService.getProduct(+this.route.snapshot.paramMap.get('id')).subscribe((results)=>{
      this.products = results
      console.log(results)
    },error =>{
      console.log(error)
    })
  }

  addToCart(){
    this.CartService.addToCart(this.products,this.amount)
  }
  incrementAmount(){
    this.amount++
  }
  decrementAmount(){
    this.amount--
  }


}
