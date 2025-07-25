import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { News } from '../types/news.type';
import { Observable } from 'rxjs';
import { NewsCreateRequest } from '../types/news-create-request.type';
import { NewsCreateResponse } from '../types/new-create-response.type';

@Injectable({
  providedIn: 'root'
})



export class NewsService {

  private readonly apiURL: string = "http://localhost:8080/news-api/news"

  constructor(private httpCilent: HttpClient,
  ) { }

  getAll(): Observable<News[]> {
    return this.httpCilent.get<News[]>(this.apiURL);
  }

  get(id:string): Observable<News> {
    return this.httpCilent.get<News>(this.apiURL+"/"+id);
  }
}
