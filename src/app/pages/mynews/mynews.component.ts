import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { NewsService } from '../../services/news.service';
import { Observable } from 'rxjs/internal/Observable';
import { GetRequestFilter } from '../../types/get-request-filter.type';
import { ToastrService } from 'ngx-toastr';
import { NewsGetResponse } from '../../types/news-get-response.type';
import { AsyncPipe } from '@angular/common';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-mynews',
  imports: [
    NavbarComponent,
    AsyncPipe,
    ConfirmDialogComponent
  ],
  providers: [NewsService],
  templateUrl: './mynews.component.html',
  styleUrl: './mynews.component.scss'
})
export class MynewsComponent {

  news$!:Observable<NewsGetResponse>;

  constructor(private newsService:NewsService,
              private toastrService:ToastrService,
              private router:Router
  ){ }

  ngOnInit(){
    this.getNews()
  }

  getNews(){
    const filterData:GetRequestFilter = {
      title:null,
      writer:sessionStorage.getItem("username"),
      publicationDate: null
    }

    this.news$ = this.newsService.getAll(filterData);
    this.news$.subscribe({
      error : () => this.toastrService.error("Error retrieving news from API.")
    })
  }

  navigateUpdate(id:string){
    this.router.navigate(["/news/update/"+id])
  }

  deleteNews(id: string) {
    this.newsService.delete(id).subscribe({
      next: () => {
        this.toastrService.success("News deleted successfully.");
        this.getNews();
      },
      error: () => this.toastrService.error("Error deleting news, try again later.")
    })
  }
  

  navigateDetails(id:string){
    this.router.navigate(["/news/"+id])
  }

}
