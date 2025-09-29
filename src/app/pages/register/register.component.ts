import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserFormsLayoutComponent } from "../../components/user-forms-layout/user-forms-layout.component";
import { Router } from '@angular/router';
import { RegisterFormData } from '../../types/register-form-data.type';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    UserFormsLayoutComponent
  ],
  providers: [UserService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm!: FormGroup
  loading:boolean = false;


  constructor(private userService: UserService,
    private toastrService: ToastrService,
    private router: Router
  ) {
    this.registerForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      passwordConfirm: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required)
    })
  }

  onSubmit() {
    if (this.registerForm.valid) {
      let data: RegisterFormData = this.registerForm.value;
      if (data.password === this.registerForm.value.passwordConfirm) {
        this.loading = true;
        this.userService.register(data).subscribe({
          next: () => {
            this.loading = false;
            this.toastrService.success("Your account has been created successfully.")
          },
          error: (value) => {
            this.loading = false;
            this.toastrService.error("Failed to create account: " + value.message + ".")
          }
        });
      }else{
        this.toastrService.error("Password and password confirmation fields must be exactly equal.")
      }

    }
  }

  onNavigate() {
    this.router.navigate(["login"])
  }
}
