import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { DefaultButton } from "../../components/default-button/default-button";
import { NewsService } from '../../services/news.service';
import { Observable } from 'rxjs';
import { News } from '../../types/news.type';
import { AsyncPipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [
    NavbarComponent,
    DefaultButton,
    AsyncPipe
  ],
  providers:[NewsService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(private newsService:NewsService,
    private toastrService: ToastrService,
    private router: Router
  ){}

  listNews$!:Observable<News[]>

  ngOnInit(){
    this.listNews$ = this.newsService.getAll();
    this.listNews$.subscribe({
      error : () => {
        this.toastrService.error("Error retrieving news from API.")
      }
    })
  }

  navigateToNewsDetails(id:string){
    this.router.navigate([`/news/${id}`])
  }
}
