import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserFormsLayoutComponent } from "../../components/user-forms-layout/user-forms-layout.component";
import { Router } from '@angular/router';
import { LoginFormData } from '../../types/login-form-data.type';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    UserFormsLayoutComponent
],
  providers: [UserService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {

  loginForm!: FormGroup



  constructor(private userService: UserService,
    private toastrService: ToastrService,
    private router: Router
  ) {
    localStorage.removeItem("auth-token");
    localStorage.removeItem("username");
    localStorage.removeItem("user-role");
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }

  onSubmit() {
    if (this.loginForm.valid) {
      let data: LoginFormData = this.loginForm.value;
      this.userService.login(data).subscribe({
        next: () => this.toastrService.success("Login Sucefully"),
        error: (value:HttpErrorResponse) => {
          console.log(value.status);
          if(value.status == 401){
            this.toastrService.error("Login failed. The username or password entered is incorrect.")
          }else{
            this.toastrService.error("Login failed due to an internal error try again later.")
          }
        } 
      });
    }
  }

  onNavigate(){
    this.router.navigate(["register"])
  }

}
