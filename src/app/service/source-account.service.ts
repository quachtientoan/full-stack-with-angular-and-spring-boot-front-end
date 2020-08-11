import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SourceAccount } from '../Model/source-account';
import { API_URL } from '../app.constant';

@Injectable({
  providedIn: 'root'
})
export class SourceAccountService {

  constructor(
    private http : HttpClient
  ) { }

  getAll(username : string){
    return this.http.get<SourceAccount[]>(`${API_URL}/api/user/${username}/source-account`)
  }
}
