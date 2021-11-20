import { HttpClient, HttpHeaders, JsonpClientBackend } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, of, ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from '../Models/User';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { IAddress } from '../Models/Address';
import { IForgotPassword } from '../Models/ForgotPassword';
import { IResetPassword } from '../Models/ResetPassword';


@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.baseUrl
  public currentUserSource = new ReplaySubject<IUser>(1)
  currentUser$ = this.currentUserSource.asObservable()
  helper = new JwtHelperService();
  
  constructor(private http:HttpClient,private route:Router) { }

  login(values:any){
    return this.http.post<IUser>(this.baseUrl + 'Account/Login',values).pipe(
      map((results:IUser)=>{
        if(results){
          const decodeToken = this.helper.decodeToken<IUser>(results.token)
          results.email = decodeToken.email;
          results.JobDepartment = decodeToken.JobDepartment;
          results.role = decodeToken.role;
          localStorage.setItem('user',JSON.stringify(results))
          localStorage.setItem('token',results.token)
          this.setCurrentUser(results)
          console.log(results)
          return results
        }
      })
    )
  }

  register(values:any){
    return this.http.post(this.baseUrl + 'Account/Register', values).pipe(
      map((user:IUser)=>{
        if(user){
          localStorage.setItem('user',JSON.stringify(user))
          localStorage.setItem('token',user.token);
          this.currentUserSource.next(user);
        }
      })
    );
  }

  setCurrentUser(user:IUser){
    if(user){
      user.role = [];
      const roles = this.decodeToken(user.token).role;
      Array.isArray(roles)? user.role = roles : user.role.push(roles);
      localStorage.setItem('user',JSON.stringify(user))
      this.currentUserSource.next(user);
    }
  }

  decodeToken(token: string){
    return JSON.parse(atob(token.split('.')[1]));
  }

  forgotPassword(email:IForgotPassword){
    return this.http.post(this.baseUrl + 'Account/ForgotPassword',email)
  }

  resetPassword(confirmP:IResetPassword){
    return this.http.post<IResetPassword>(this.baseUrl + 'Account/ResetPassword',confirmP)
  }

  confirmEmail(model:any){
    return this.http.post(this.baseUrl + 'Account/ConfirmEmail',model)
  }

  logOut(){
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    this.currentUserSource.next(null)
    this.route.navigateByUrl('/')
  }

  getUserAddress(){
    return this.http.get<IAddress>(this.baseUrl+'Account/GetAddress');
  }
  
  updateUserAddress(address:IAddress){
   return this.http.post<IAddress>(this.baseUrl+'Account/Address', address);
  }
}
