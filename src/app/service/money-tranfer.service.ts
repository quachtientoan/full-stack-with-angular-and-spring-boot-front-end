import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MoneyTranfer } from '../Model/money-tranfer';
import { API_URL } from '../app.constant';

@Injectable({
  providedIn: 'root'
})
export class MoneyTranferService {

  constructor(
    private http : HttpClient
  ) { }

  create(username : string, body : MoneyTranfer){
    return this.http.post<any>(`${API_URL}/api/user/${username}/money-tranfer`,body)
  }
}
