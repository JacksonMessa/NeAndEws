import { AfterViewInit, Component, EventEmitter, Input, Output, output } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DefaultButton } from '../default-button/default-button';
import { NewsService } from '../../services/news.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NewsDefaultRequest } from '../../types/news-default-request.type';
import { NgOptimizedImage } from '@angular/common';
import { Observable } from 'rxjs';
import { News } from '../../types/news.type';

@Component({
  selector: 'news-form',
  imports: [
    NavbarComponent,
    ReactiveFormsModule,
    DefaultButton,
    NgOptimizedImage
  ],
  providers: [NewsService],
  templateUrl: './news-form.component.html',
  styleUrl: './news-form.component.scss'
})
export class NewsFormComponent{
  @Input() title:string = "";
  @Input() submitBtnText = "";
  @Output() submit = new EventEmitter<NewsDefaultRequest>()
  @Input() newsId:string | null = null;

  newsForm!: FormGroup;
  news$!: Observable<News>;

  constructor(private newsService: NewsService,
              private toastrService: ToastrService,
              private router: Router
  ) {
    this.newsForm = new FormGroup({
      title: new FormControl('',Validators.required),
      body: new FormControl('',Validators.required)
    })
  }

  ngOnInit(){
    if(this.newsId){
      this.news$ = this.newsService.get(this.newsId);
        this.news$.subscribe({
          next: (value) => {
            if(!(value.writer === localStorage.getItem("username"))){
              this.toastrService.error("You don't have permission to edit this news.")
              this.router.navigate(['/home'])
            }else{
              this.newsForm.patchValue({
                title:value.title,
                body:value.body
              })
            }
          },
          error: () => {
            this.toastrService.error("Error retrieving news from API.")
          }
        });
    }
  }

  onSubmit(){
    if(this.newsForm.valid){
      const data: NewsDefaultRequest = this.newsForm.value;
      this.submit.emit(data);
    }
  }
  
}
