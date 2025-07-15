import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoggedAuthGuard implements CanActivate{

  constructor(private router: Router) {  }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    const authToken = sessionStorage.getItem('auth-token');

    if(authToken){
      return true;
    }else{
      this.router.navigate(["/login"])
      return false;
    }
  }
}
