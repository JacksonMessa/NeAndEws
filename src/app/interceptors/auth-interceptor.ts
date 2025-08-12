import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';
import { UserService } from '../services/user.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  
  const token = localStorage.getItem("auth-token");
  const toastrService = inject(ToastrService);
  const userService = inject(UserService);

    if(token){
      req = req.clone({
        setHeaders: {
          Authorization: "Bearer " + token
        }
      })
    }

    return next(req).pipe(
      catchError(error =>{
        if(error.status == 401){
          toastrService.error("Your token has expired or is invalid, please log in again.");
          userService.logout();
        }
        return throwError(() => error);
      })
    )
};
