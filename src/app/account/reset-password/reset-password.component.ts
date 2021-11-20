import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  params:any = {};
  constructor(private route:ActivatedRoute,private accountService:AccountService) { }

  ngOnInit(): void {
  }

  resetPassword(){
   
  }
  getParams(){
    //I have to check for null values
    this.params.token = this.route.snapshot.queryParamMap.get('token')
    this.params.userId = this.route.snapshot.queryParamMap.get('userId')
  }

}
