import { HttpResponse } from '@angular/common/http';
import { RegisterService } from './../service/register.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export class User {
  constructor(
    public id: number,
    public username: string,
    public password: string,
    public email: string,
    public role: string

  ) {

  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User
  message: string
  retypePassword: string
  constructor(
    private registerService: RegisterService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.user = new User(null, ``, ``, ``, ``)
  }

  saveRegister() {
    if (this.user.password != this.retypePassword) {
      this.message = "Password confirm does not match"
    } else {
      this.registerService.registerUser(this.user).subscribe(
        response => {
          console.log(response)
          if (response instanceof HttpResponse) {
            this.message = response.body.message
          }

        },
        err => {
          this.message = "ERROR"
        }
      )
    }


  }
}
