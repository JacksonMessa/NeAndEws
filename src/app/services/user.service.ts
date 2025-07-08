import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { pipe, tap } from 'rxjs';
import { LoginResponse } from '../types/login-response.type';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly apiURL : string = "http://localhost:8080/news-api/user"

  constructor(private httpClient: HttpClient) { }

  login(username:string, password:string){
    return this.httpClient.post<LoginResponse>(this.apiURL+"/login",{username,password}).pipe(
      tap((value) => {
        sessionStorage.setItem("auth-token",value.token);
        sessionStorage.setItem("username",value.user.username)
        sessionStorage.setItem("user-role",value.user.role)
      })
    )
  }

}
