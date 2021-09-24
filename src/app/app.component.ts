import { Component, OnInit } from '@angular/core';
import { AccountService } from './account/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'SunStarrs';

  constructor( private accountService:AccountService){}
  ngOnInit(): void {
    // this.loadCurrentUser();
  }
  
  // loadCurrentUser(){
  //   const token = localStorage.getItem('token');
  //     this.accountService.loadCurrentUser(token).subscribe(()=>{
  //       console.log('User Loaded');
  //     },error =>{
  //       console.log(error);
        
  //     }); 
  // }
}
