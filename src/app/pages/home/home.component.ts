import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { DefaultButton } from "../../components/default-button/default-button";
import { NewsService } from '../../services/news.service';
import { Observable } from 'rxjs';
import { News } from '../../types/news.type';
import { AsyncPipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NewsGetResponse } from '../../types/news-get-response.type';

@Component({
  selector: 'app-home',
  imports: [
    NavbarComponent,
    DefaultButton,
    AsyncPipe
  ],
  providers: [NewsService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(private newsService: NewsService,
    private toastrService: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  news$!: Observable<NewsGetResponse>;
  pageCounter: string[] = new Array();
  morePagesAfter: boolean = false;
  disableNextPageBtn: boolean = false;
  pageSelected!: number;


  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.pageSelected = params['page'];

      if (!this.pageSelected || this.pageSelected < 1) {
        this.pageSelected = 1;
      }

      this.news$ = this.newsService.getAll(this.pageSelected - 1, 5);
      this.news$.subscribe({
        next: (value) => {

          if(this.pageSelected>value.pagesFound){
            this.pageNavigate(value.pagesFound.toString());
          }

          let i: number = 0;
          let lastPageVisible: number = 0;

          let pagesLeft: number = value.pagesFound - this.pageSelected;

          if (value.pagesFound <= 5 || this.pageSelected <= 3) {
            i = 1;
            value.pagesFound <= 5 ? lastPageVisible = value.pagesFound : lastPageVisible = 5;
          } else if (pagesLeft >= 2) {
            i = this.pageSelected - 2;
            lastPageVisible = +this.pageSelected + 2;
          } else{
            i = this.pageSelected - 4 + pagesLeft;
            lastPageVisible = +this.pageSelected + pagesLeft;
          }

          this.pageCounter = [];
          for (i; i <= lastPageVisible; i++) {
            this.pageCounter.push(i.toString());
          }

          if (!this.pageCounter.includes(value.pagesFound.toString())) {
            this.morePagesAfter = true;
          }else{
            this.morePagesAfter = false;
          }

          if (value.pagesFound==this.pageSelected) {
            this.disableNextPageBtn = true;
          }else{
            this.disableNextPageBtn = false;
          }

        },
        error: () => {
          this.toastrService.error("Error retrieving news from API.")
        }
      })
    });
  }

  navigateToNewsDetails(id: string) {
    this.router.navigate([`/news/${id}`])
  }

  pageNavigate(page:string){
    this.router.navigate(["home"],{ queryParams: { page: page }, queryParamsHandling: 'merge' })
  }


}
