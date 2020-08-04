import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../register/register.component';
import { TODO_JPA_API_URL } from '../app.constant';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
user : User
  constructor(
    private http : HttpClient
  ) { }

  registerUser(User){
   return this.http.post<any>(`${TODO_JPA_API_URL}/users/register`, User,{observe: 'response'})
  }

}
