import { NgSwitch } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IRegister } from 'src/app/Models/Register';

import { AccountService } from '../account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
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
    this.createForm()
  }
  onSubmit(){
    this.accountService.register(this.registerForm.value).subscribe(()=>{
      //routing logic here
      console.log('user register')
    },error =>{
      console.log(error)
    })
  }

  isManager():boolean{
    return this.accountService.user.role === 'Manager'? true : false;
  }

  isAdmin():boolean{
    return this.accountService.user.role === 'Admin'? true : false;
  }

  roleChange(value: any) {
    this.register.role = value;
  }

  claimChange(value: any) {
    this.register.JobDepartment = value;
  }

  createForm(){
    this.registerForm = new FormGroup({
      email:new FormControl('',[Validators.required,Validators.email]),
      password:new FormControl('',Validators.required),
      firstName:new FormControl('',Validators.required),
      lastName:new FormControl('',Validators.required),
      confirmPassword:new FormControl('',Validators.required),
      role:new FormControl('',Validators.required),
      JobDepartment:new FormControl('',Validators.required)
    })
  }


}
