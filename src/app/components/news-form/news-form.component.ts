import { Component, EventEmitter, Input, Output, output } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DefaultButton } from '../default-button/default-button';
import { NewsService } from '../../services/news.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NewsDefaultRequest } from '../../types/news-default-request.type';
import { NgOptimizedImage } from '@angular/common';

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
export class NewsFormComponent {
  @Input() title:string = "";
  @Output() submit = new EventEmitter<NewsDefaultRequest>()

  newsForm!: FormGroup;

  constructor(private newsService: NewsService,
              private toastrService: ToastrService,
              private router: Router
  ) {
    this.newsForm = new FormGroup({
      title: new FormControl('',Validators.required),
      body: new FormControl('',Validators.required)
    })
  }

  onSubmit(){
    if(this.newsForm.valid){
      const data: NewsDefaultRequest = this.newsForm.value;
      this.submit.emit(data);
    }
  }
  
}
