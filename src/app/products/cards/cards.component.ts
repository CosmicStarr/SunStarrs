import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IProducts } from 'src/app/Models/Products';
import { IShoppingCart } from 'src/app/Models/ShoppingCart';
import { ShoppingCartService } from 'src/app/_services/shopping-cart.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {
  @Input() product:IProducts

  constructor() { }

  ngOnInit(): void {

  }


}
