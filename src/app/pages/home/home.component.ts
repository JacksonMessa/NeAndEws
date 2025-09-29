import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { DefaultButton } from "../../components/default-button/default-button";
import { NewsService } from '../../services/news.service';
import { finalize, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NewsGetResponse } from '../../types/news-get-response.type';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GetRequestFilter } from '../../types/get-request-filter.type';


@Component({
  selector: 'app-home',
  imports: [
    NavbarComponent,
    DefaultButton,
    AsyncPipe,
    ReactiveFormsModule
  ],
  providers: [NewsService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  news$!: Observable<NewsGetResponse>;
  pageCounter: string[] = new Array();
  disableCleanBtn: boolean = false;
  morePagesAfter: boolean = false;
  disableNextPageBtn: boolean = false;
  pageSelected!: number;
  newsFound: number = 0;
  filterForm!: FormGroup;
  filterData :GetRequestFilter = {title:null, writer:null, publicationDate:null};
  readonly pageSize:number = 5;
  loading:boolean = false;

  constructor(private newsService: NewsService,
    private toastrService: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { 
    this.filterForm = new FormGroup({
      title: new FormControl(''),
      writer: new FormControl(''),
      publicationDate: new FormControl('')
    });
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.pageSelected = params['page'];

      this.disableCleanBtn = !(params['title'] || params['writer'] || params['publicationDate']);


      if (!this.pageSelected || this.pageSelected < 1) {
        this.pageSelected = 1;
      }

      this.filterData = {
        title: params['title'],
        writer: params['writer'],
        publicationDate: params['publicationDate']
      };

      this.filterForm.patchValue({
        title: params['title'],
        writer: params['writer'],
        publicationDate: params['publicationDate']
      })

      this.news$ = this.newsService.getAllPaged(this.pageSelected - 1, this.pageSize,this.filterData);
      this.loading = true;
      this.news$.subscribe({
        next: (value) => {
          if(this.pageSelected>value.pagesFound && value.pagesFound>0){
            this.pageNavigate(value.pagesFound.toString());
          }

          this.newsFound=value.newsFound;

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
          this.loading = false;
        }
      })
    });
    this.news$.pipe(
      finalize (() => {
        this.loading = false;
      })
    )
  }

  navigateToNewsDetails(id: string) {
    this.router.navigate([`/news/${id}`])
  }

  pageNavigate(page:string){
    this.router.navigate(["home"],{ queryParams: { page: page }, queryParamsHandling: 'merge' })
  }

  applyFilters(){

    this.filterData.title = this.filterForm.value.title ?  this.filterForm.value.title : null;
    this.filterData.writer = this.filterForm.value.writer ?  this.filterForm.value.writer : null;
    this.filterData.publicationDate = this.filterForm.value.publicationDate ? this.filterForm.value.publicationDate: null;

    this.router.navigate(["home"],{ queryParams: this.filterData, queryParamsHandling: 'replace'})
  }

  cleanFilters(){

    this.filterData = {title:null, writer:null, publicationDate:null};

    this.router.navigate(["home"],{ queryParams: this.filterData, queryParamsHandling: 'replace'})
  }


}
