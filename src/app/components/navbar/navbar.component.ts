import { Component } from '@angular/core';
import { DefaultButton } from "../default-button/default-button";
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'navbar',
  imports: [
    DefaultButton,
    NgOptimizedImage,
    CommonModule
  ],
  providers: [UserService],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  isWriter:boolean = false;
  path:string = "";

  constructor(private userService: UserService,
              private activatedRoute: ActivatedRoute
  ){
    if(localStorage.getItem("user-role")=="WRITER"){
      this.isWriter=true;
    }
    this.path = this.activatedRoute.snapshot.url[0].path;
  }



  logout(){
    this.userService.logout();
  }
}
