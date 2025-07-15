import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserFormsLayoutComponent } from "../../components/user-forms-layout/user-forms-layout.component";
import { Router } from '@angular/router';
import { LoginFormData } from '../../types/login-form-data.type';

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
        error: () => this.toastrService.error("Login Failed. Please check that you have entered your username and password correctly.")
      });
    }
  }

  onNavigate(){
    this.router.navigate(["register"])
  }

}
