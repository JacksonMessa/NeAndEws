import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { DefaultButton } from "../../components/default-button/default-button";
import { UserService } from '../../services/user.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [
    NgOptimizedImage,
    DefaultButton,
    ReactiveFormsModule
  ],
  providers: [UserService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {

  loginForm!: FormGroup



  constructor(private userService: UserService,
    private toastrService: ToastrService
  ) {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }

  onSubmit() {
    if (this.loginForm.valid) {
      let data: { username: string, password: string } = this.loginForm.value;
      this.userService.login(data.username, data.password).subscribe({
        next: () => this.toastrService.success("Login Sucefully"),
        error: () => this.toastrService.error("Login Failed. Please check that you have entered your username and password correctly.")
      });
    }
  }

}
