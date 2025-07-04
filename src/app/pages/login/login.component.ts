import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { DefaultButton } from "../../components/default-button/default-button";

@Component({
  selector: 'app-login',
  imports: [
    NgOptimizedImage,
    DefaultButton
],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

}
