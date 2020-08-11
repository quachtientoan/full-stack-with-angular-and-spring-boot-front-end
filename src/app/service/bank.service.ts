import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Bank } from '../Model/bank';
import { API_URL } from '../app.constant';

@Injectable({
  providedIn: 'root'
})
export class BankService {

  constructor(
    private http : HttpClient
  ) { }

  getAll(username : string){
    return this.http.get<Bank[]>(`${API_URL}/api/user/${username}/banks`)
  }

  searchBanksContaining(username : string, keyword : string){
    return this.http.get<Bank[]>(`${API_URL}/api/user/${username}/banks/${keyword}`)
  }
}
