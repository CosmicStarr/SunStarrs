
import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../account.service';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
forgotForm:FormGroup
  constructor(private account:AccountService) { }

  ngOnInit(): void {
    this.forgotPasswordForm()
  }

  onSubmit(){
    this.account.forgotPassword(this.forgotForm.value).subscribe((results)=>{
      console.log(results)
    })
  }

  forgotPasswordForm(){
    this.forgotForm = new FormGroup({
      email:new FormControl('',[Validators.required,Validators.email,Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')])
    })
  }
}
