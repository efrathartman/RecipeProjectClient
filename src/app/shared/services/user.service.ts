
import { Injectable, inject } from '@angular/core';


import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { environment } from '../../../environments/environment.development';

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
      localStorage.setItem('mytoken',token)
    else {
      localStorage.removeItem('mytoken');
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
}
