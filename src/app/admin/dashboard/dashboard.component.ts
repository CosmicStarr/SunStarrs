import { Component, OnInit } from '@angular/core';
import { MediaChange,MediaObserver } from '@angular/flex-layout';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  gridColumns:number = 4
  cardColSpan:number = 2
  constructor(private mediaObserver:MediaObserver) { }

  ngOnInit(): void {
    // responsive dashboard
    this.mediaObserver.asObservable().subscribe((results:MediaChange[])=>{
     if(results.some(x => x.mqAlias == "lt-sm")){
       this.gridColumns = 1
       this.cardColSpan = 1
     }else if(results.some(x => x.mqAlias == "lt-md")){
      this.gridColumns = 2
      this.cardColSpan = 2
     }else{
       this.gridColumns = 4
       this.cardColSpan = 2
     }
    })
  }

}
