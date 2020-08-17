import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_URL } from '../app.constant';
import { MoneyTranferView } from '../Model/money-tranfer-view';
import { MoneyTranfer } from '../Model/money-tranfer';

@Injectable({
  providedIn: 'root'
})
export class MoneyTranferService {

  constructor(
    private http: HttpClient
  ) { }

  create(username: string, body: MoneyTranferView) {
    return this.http.post<any>(`${API_URL}/api/user/${username}/money-tranfer`, body)
  }

  getList(username: string) {
    return this.http.get<MoneyTranferView[]>(`${API_URL}/api/user/${username}/money-tranfer`)

  }

  getOne(username: string, id: number) {
    return this.http.get<MoneyTranferView>(`${API_URL}/api/user/${username}/money-tranfer/${id}`)

  }

  deleteOne(username: string, id: number) {
    return this.http.delete<any>(`${API_URL}/api/user/${username}/money-tranfer/${id}`)
  }

  // deleteMultiple(username : string, ids : number[]){
  //   return this.http.delete<any>(`${API_URL}/api/user/${username}/money-tranfer/`, ids)
  // }

  // deleteTrans(username: string, ids: number[]) {
  //   const data = { 'ids': ids };
  //   const url = `${API_URL}/api/user/${username}/delete/money-tranfer/`;
  //   const options = {
  //     headers: new HttpHeaders({
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     }),
  //     responseType: 'text' as 'json'
  //   };

  //   const resp = this.http.post<any>(url, data, options);//.map(resp => {return resp;}).catch(err => {console.log(err);});


  //   return resp;
  // }
}
