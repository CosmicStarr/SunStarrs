import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IActualOrder, OrderedItem } from 'src/app/Models/Orders';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss']
})
export class UserAccountComponent implements OnInit {
  orders:IActualOrder

  constructor(private account:AccountService,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.account.getOrders().subscribe((results:IActualOrder)=>{
     this.orders = results
      console.log(results)
    })
    // this.account.getSingleOrder(+this.activatedRoute.snapshot.paramMap.get('id')).subscribe((results)=>{
    //   this.order = results
    // })
  }

}
