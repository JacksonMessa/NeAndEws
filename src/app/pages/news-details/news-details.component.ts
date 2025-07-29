import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { Observable, switchMap } from 'rxjs';
import { News } from '../../types/news.type';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NewsService } from '../../services/news.service';
import { AsyncPipe, DatePipe } from '@angular/common';
import { DefaultButton } from "../../components/default-button/default-button";

@Component({
  selector: 'app-news-details',
  imports: [
    NavbarComponent,
    AsyncPipe,
    DatePipe,
    DefaultButton,
],
  templateUrl: './news-details.component.html',
  providers: [NewsService],
  styleUrl: './news-details.component.scss'
})
export class NewsDetailsComponent {
  id: string | null = null;
  news$!: Observable<News>;
  formatedBody!: string[];
  isWriterOfThisNews: boolean = false;

  constructor(private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private newsService: NewsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get("id");
      if (this.id) {
        this.news$ = this.newsService.get(this.id);
        this.news$.subscribe({
          next: (value) => {
            this.formatedBody = value.body.split("\n");
            this.isWriterOfThisNews = value.writer === sessionStorage.getItem("username")
          },
          error: () => {
            this.toastrService.error("Error retrieving news from API.")
          }
        });
      }
    });
  }

  navigateToNewsUpdate(id: string){
    this.router.navigate([`/news/update/${id}`]);
  }

}
