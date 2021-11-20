import { NgSwitch } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { IRegister } from 'src/app/Models/Register';
import { IUser } from 'src/app/Models/User';

import { AccountService } from '../account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  currentUser$:Observable<IUser>
  registerForm:FormGroup
  roleOptions: string[] = ['Admin', 'Manager'];
  developerType: string[] = ['Developer', 'Designer'];
  register:any = {
    email: '',
    firstName:'',
    lastName:'',
    password:'',
    confirmPassword:'',
    role:'Admin',
    JobDepartment:'Developer'
  }

  constructor(public accountService:AccountService) { }
  
  ngOnInit(): void {
    this.currentUser$ = this.accountService.currentUser$
    this.createForm()

  }
  onSubmit(){
    this.accountService.register(this.registerForm.value).subscribe(()=>{
      //routing logic here
      console.log(this.registerForm.value)
    },error =>{
      console.log(error)
    })
  }



  roleChange(value: any) {
    this.register.role = value;
  }

  claimChange(value: any) {
    this.register.JobDepartment = value;
  }

  createForm(){
    this.registerForm = new FormGroup({
      email:new FormControl('',[Validators.required,Validators.email,Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]),
      password:new FormControl('',Validators.required),
      firstName:new FormControl('',Validators.required),
      lastName:new FormControl('',Validators.required),
      confirmPassword:new FormControl('',Validators.required),
      role:new FormControl('',Validators.required),
      JobDepartment:new FormControl('',Validators.required)
    })
  }


}
