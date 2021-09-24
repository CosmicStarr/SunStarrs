import { Component, Input, OnInit } from '@angular/core';
import { IProducts } from 'src/app/Models/Products';

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
