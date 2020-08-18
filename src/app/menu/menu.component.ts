import { HardcodeAuthenticationService } from './../service/hardcode-authentication.service';
import { Component, OnInit } from '@angular/core';
import { BasicAuthenticationService } from '../service/basic-authentication.service';

export const ROLE_ADMIN = "ADMIN"
export const ROLE_USER = "USER"

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit {

  roles : string
 // isUserLoggedIn : boolean = false
  constructor(public hardcodeAuthenticationService : HardcodeAuthenticationService,
    public basicAuthenticationService : BasicAuthenticationService
    ) { }

  ngOnInit(): void {
    //this.isUserLoggedIn = this.hardcodeAuthenticationService.isUserLoggedIn();
    this.roles = this.basicAuthenticationService.getAuthenticateRole()
    if(this.roles.includes(ROLE_ADMIN)){
      console.log(true)
    }

  }

  isRoleAdmin(){
    this.roles = this.basicAuthenticationService.getAuthenticateRole()
    if(this.roles.includes(ROLE_ADMIN)){
      return true;
    }else{
      return false
    }
  }

  isRoleUser(){
    this.roles = this.basicAuthenticationService.getAuthenticateRole()
    if(this.roles.includes(ROLE_USER)){
      return true;
    }else{
      return false
    }
  }
  
}
