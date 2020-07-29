import { Customer } from './../list-customers/list-customers.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class CustomerDataService {
  constructor(
    private http: HttpClient
  ) { }

  retrieveAllCustomers(username) {
    return this.http.get<Customer[]>(`/api/user/${username}/customers`)
  }

  deleteCustomer(username, id) {
    return this.http.delete(`/api/user/${username}/customer/${id}`)
  }

  retrieveCustomer(username, id) {
    return this.http.get<Customer>(`/api/user/${username}/customers/${id}`)
  }

  updateCustomer(username, id, Customer) {

    return this.http.put(`/api/user/${username}/customers/${id}`, Customer)
  }

  createCustomer(username, Customer) {

    return this.http.post(`/api/user/${username}/customers`, Customer)
  }

  createBasicAuthenticationHttpHeader(){
    let username = 'admin'
    let password = 'admin'
    let basicAuthHeaderString = 'Basic ' + window.btoa(username + ':' +password)
    return basicAuthHeaderString
  }

}
