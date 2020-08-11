import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipientAccount } from '../Model/recipient-account';
import { API_URL } from '../app.constant';

@Injectable({
  providedIn: 'root'
})
export class RecipientAccountService {

  constructor(
    private http : HttpClient
  ) { }

  getAll(username : string){
    return this.http.get<RecipientAccount[]>(`${API_URL}/api/user/${username}/recipient-account`)
  }
}
