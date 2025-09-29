import { Component } from '@angular/core';

import { NewsDefaultRequest } from '../../types/news-default-request.type';
import { ToastrService } from 'ngx-toastr';
import { NewsDefaultResponse } from '../../types/news-default-response.type';
import { Router } from '@angular/router';
import { NewsService } from '../../services/news.service';
import { NewsFormComponent } from "../../components/news-form/news-form.component";

@Component({
  selector: 'app-news-publish',
  imports: [NewsFormComponent],
  providers: [NewsService],
  templateUrl: './news-publish.component.html',
  styleUrl: './news-publish.component.scss'
})

export class NewsPublishComponent {

  loading:boolean = false;

  constructor(private toastrService:ToastrService,
              private router: Router,
              private newsService: NewsService
  ){}


  publish(data: NewsDefaultRequest){
    this.loading=true;
    this.newsService.create(data).subscribe({
      next: (value: NewsDefaultResponse) => {
        this.toastrService.success("News published successfully.");
        this.router.navigate([`news/${value.id}`]);
        this.loading = false;
      },
      error: () => {
        this.toastrService.error("Error publishing news, try again later.");
        this.loading = false;
      }
    });

  }

}
