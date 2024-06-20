
import { Injectable, inject } from '@angular/core';


import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http =inject(HttpClient)
  private usersUrl=`${environment.apiURL}/users`;

  // constructor(private http:HttpClient) { 
  // }
  current?:User 
  
  public get token():string|null{
    return localStorage.getItem('mytoken')
  }
  public set token(token:string|null){
    if(token)
      {

      console.log(localStorage,"local");
      
      localStorage.setItem('mytoken',token)
      }
    else {
      localStorage.removeItem('mytoken');
    }

  }
 
  public get nameuser():string|null{
    return localStorage.getItem('nameuser')
  }
  public set nameuser(nameuser:string|null){
    if(nameuser)
      {

      console.log(localStorage,"local");
      
      localStorage.setItem('nameuser',nameuser)
      }
    else {
      localStorage.removeItem('nameuser');
    }
  }
  public get userid():string|null|number{
    return localStorage.getItem('userid')
  }

  public set userid(id:string|null){
    if(id)
      {

      console.log(localStorage,"local");
      
      localStorage.setItem('userid',id)
      }
    else {
      localStorage.removeItem('userid');
    }
  }
  

  getAllUsers(){
    return this.http.get<User[]>(this.usersUrl)
  }

  login(u: User){
    console.log(u.password);
    
    return this.http.post<{user:User;token:string}>(`${this.usersUrl}/signin`,u)
  }

  addUser(u: User){
    return this.http.post<{user:User;token:string}>(`${this.usersUrl}/signup`,u)
  }
  isEnabelad():Observable<{ userId: string }>
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    };
    return this.http.get<{ userId: string }>(`${this.usersUrl}/isEnabelad`,httpOptions)
  }
}
