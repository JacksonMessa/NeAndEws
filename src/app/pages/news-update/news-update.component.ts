import { Component } from '@angular/core';
import { NewsFormComponent } from "../../components/news-form/news-form.component";
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { News } from '../../types/news.type';
import { Observable } from 'rxjs';
import { NewsService } from '../../services/news.service';
import { ToastrService } from 'ngx-toastr';
import { NewsDefaultRequest } from '../../types/news-default-request.type';
import { NewsDefaultResponse } from '../../types/news-default-response.type';

@Component({
  selector: 'app-news-update',
  imports: [NewsFormComponent],
  providers: [NewsService],
  templateUrl: './news-update.component.html',
  styleUrl: './news-update.component.scss'
})
export class NewsUpdateComponent {

  id: string | null = null;
  news$!: Observable<News>;
  loading:boolean = false;

  constructor( private activatedRoute:ActivatedRoute,
    private newsService: NewsService,
    private toastrService: ToastrService,
    private router: Router
  ){}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get("id");
    });
  }

  update(data: NewsDefaultRequest){
    this.loading = true;
      this.newsService.update(data,this.id).subscribe({
        next: (value: NewsDefaultResponse) => {
          this.toastrService.success("News updated successfully.");
          this.router.navigate([`news/${value.id}`]);
          this.loading = false;
        },
        error: () => {
          this.toastrService.error("Error updating news, try again later.");
          this.loading = false;
        }
      });
  
    }

}
