import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, pipe, switchMap, tap } from 'rxjs';
import { LoginResponse } from '../types/login-response.type';
import { RegisterFormData } from '../types/register-form-data.type';
import { LoginFormData } from '../types/login-form-data.type';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly apiURL: string = "http://localhost:8080/news-api/user"

  constructor(private httpClient: HttpClient,
    private router: Router
  ) { }

  login(data: LoginFormData,
  ) {
    return this.httpClient.post<LoginResponse>(this.apiURL + "/login", data).pipe(
      tap((value) => {
        sessionStorage.setItem("auth-token", value.token);
        sessionStorage.setItem("username", value.user.username);
        sessionStorage.setItem("user-role", value.user.role);
        this.router.navigate(["/home"]);
      })
    )
  }

  register(data: RegisterFormData) {
    return this.httpClient.post<string>(this.apiURL + "/register", data).pipe(
      catchError((value) => {
        console.log(value.error);
        return throwError(() => new Error(value.error.message));
      }),
      switchMap(() => {
        return this.login({ username: data.username, password: data.password })
      }),
    )
  }

  logout() {
    sessionStorage.removeItem("auth-token");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("user-role");
    this.router.navigate(["/login"]);
  }

}
