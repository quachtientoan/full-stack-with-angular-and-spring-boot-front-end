import { BasicAuthenticationService } from './../service/basic-authentication.service';
import { HardcodeAuthenticationService } from './../service/hardcode-authentication.service';
import { Component, OnInit } from '@angular/core';
import { invalid } from '@angular/compiler/src/render3/view/util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = 'admin';
  password = 'admin';
  errorMessage = 'Invalid Credentials';
  isInvalid = false;
  constructor(
    private router: Router,
    private hardcodeAuthenticationService: HardcodeAuthenticationService,
    private basicAuthenticationService: BasicAuthenticationService
  ) { }

  ngOnInit(): void {

  }

  handleLogin() {
    if (this.hardcodeAuthenticationService.authenticate(this.username, this.password)) {
      this.router.navigate(['welcome', this.username])
      this.isInvalid = false;
    } else {
      this.isInvalid = true;
    }
  }

  handleBasicAuthLogin() {
    this.basicAuthenticationService.executeBasicAuthenticationService(this.username, this.password)
      .subscribe(
        data => {
          console.log(data)
          this.router.navigate(['welcome', this.username])
          this.isInvalid = true;
        },
        error => {
          console.log(error)
          this.isInvalid = true;
        }
      )
  }

  handleJWTAuthLogin() {
    this.basicAuthenticationService.executeJWTAuthenticationService(this.username, this.password)
      .subscribe(
        data => {
          this.router.navigate(['welcome', this.username])
          this.isInvalid = true;
        },
        error => {
          this.isInvalid = true;
        }
      )
  }
}
