import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IProducts } from '../Models/Products';
import { SunParams } from '../Models/SunStarrParams';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  Products:IProducts[]
  term: any;

  constructor(private route:ActivatedRoute,private productService:ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe((results)=>{
      this.Products = results.result;
    },error=>{
      console.log(error)
    })

  }
  searchRoute(){
    this.route.queryParams.subscribe(data =>{
      console.log(data)
    })
  }
}
