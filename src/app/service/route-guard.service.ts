import { HardcodeAuthenticationService } from './hardcode-authentication.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate{
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    if(this.hardcodeAuthenticationService.isUserLoggedIn()){
     
      return true;
      this.router.navigate(['login'])

    }

    return false;
  }
  constructor(private hardcodeAuthenticationService : HardcodeAuthenticationService,
    private router : Router) { }
}
