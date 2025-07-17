import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { UserRole } from '../types/user.type';

@Injectable({
  providedIn: 'root'
})
export class WriterAuthGuard implements CanActivate{

  constructor(private router: Router) {  }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    const userRole = sessionStorage.getItem('user-role');

    if(userRole == "WRITER"){
      return true;
    }else{
      this.router.navigate(["/home"])
      return false;
    }
  }
}
