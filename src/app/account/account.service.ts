import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, of, ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from '../Models/User';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseUrl = environment.baseUrl
  public currentUserSource = new ReplaySubject<IUser>(1)
  currentUser$ = this.currentUserSource.asObservable()
  helper = new JwtHelperService();
  user:IUser = {
    email:null,
    JobDepartment:null,
    role:null,
  }

  constructor(private http:HttpClient) { }

  login(values:any){
    return this.http.post<IUser>(this.baseUrl + 'Account/Login',values).pipe(
      map((results:IUser)=>{
        const User = results
        if(User){
          const decodeToken = this.helper.decodeToken<IUser>(User.token)
          this.user = decodeToken
          this.user.email = decodeToken.given_name;
          this.user.JobDepartment = decodeToken.JobDepartment;
          this.user.role = decodeToken.role;
          localStorage.setItem('user',JSON.stringify(User))
          localStorage.setItem('token',User.token)
          this.setCurrentUser(User)
          console.log(this.user)
          return this.user
        }
      })
    )
  }

  setCurrentUser(user:IUser){
    this.currentUserSource.next(user);
  }
  register(values:any){
    return this.http.post<IUser>(this.baseUrl + 'Account/Register', values).pipe(
      map((user:IUser)=>{
        if(user){
          localStorage.setItem('token',user.token);
          this.currentUserSource.next(user);
        }
      })
    );
  }

  confirmEmail(model:any){
    return this.http.post(this.baseUrl + 'Account/ConfirmEmail',model)
  }

  // loadCurrentUser(token:string){
  //   if(token === null){
  //     this.currentUserSource.next(null);
  //     return of(null);
  //   }
  // let headers = new HttpHeaders();
  // headers = headers.set('Authorization',`Bearer ${token}`);
  // return this.http.get(this.baseUrl +'Account',{headers}).pipe(
  //   map((user:IUser) =>{
  //     if(user){
  //       localStorage.setItem('token',user.token);
  //       this.currentUserSource.next(user);
  //     }
  //   }))
  // }


}
