// import { TOKEN } from './basic-authentication.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { API_URL } from '../app.constant';

export const TOKEN = 'token'
export const AUTHENTICATED_USER ='authenticateUser'
export const USER_ROLE ='role'

@Injectable({
  providedIn: 'root'
})
export class BasicAuthenticationService {

  constructor(
    private http: HttpClient
  ) { }

  executeJWTAuthenticationService(username, password) {
  

    return this.http.post<any>(`${API_URL}/authenticate`,{username,password}).pipe(
       map(
         data => {
          sessionStorage.setItem(AUTHENTICATED_USER, username);
          sessionStorage.setItem(TOKEN, `Bearer ${data.token}`)
          sessionStorage.setItem(USER_ROLE, data.roles);
          return data;
         }
       )
     );
  }

  executeBasicAuthenticationService(username, password) {
  
    let basicAuthHeaderString = 'Basic ' + window.btoa(username + ':' + password)

    let header = new HttpHeaders({
      Authorization: basicAuthHeaderString
    })

    return this.http.get<AuthenticationBean>(`${API_URL}/basicauth`,
     { headers: header }).pipe(
       map(
         data => {
          sessionStorage.setItem(AUTHENTICATED_USER, username);
          sessionStorage.setItem(TOKEN, basicAuthHeaderString)
          return data;
         }
       )
     );
  }

  createBasicAuthenticationHttpHeader() {
    let username = 'admin'
    let password = 'admin'
    let basicAuthHeaderString = 'Basic ' + window.btoa(username + ':' + password)
    return basicAuthHeaderString
  }

  getAuthenticateUser() {
    return sessionStorage.getItem(AUTHENTICATED_USER);
  }

  getAuthenticateToken() {
    if(this.getAuthenticateUser()){
      return sessionStorage.getItem(TOKEN);
    }
  }

  getAuthenticateRole() {
    if(this.getAuthenticateUser()){
      return sessionStorage.getItem(USER_ROLE);
    }
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem(AUTHENTICATED_USER);
    return !(user === null)
  }

  logout() {
    sessionStorage.removeItem(AUTHENTICATED_USER);
    sessionStorage.removeItem(TOKEN);
    sessionStorage.removeItem(USER_ROLE);
  }
}

export class AuthenticationBean {
  constructor(public message: string) { }
}
