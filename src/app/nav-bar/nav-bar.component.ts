import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account/account.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(public account:AccountService) { }

  ngOnInit(): void {
  }

  isManager():boolean{
    return this.account.user.role === 'Manager'? true : false;
  }

  isAdmin():boolean{
    return this.account.user.role === 'Admin'? true : false;
  }

}
