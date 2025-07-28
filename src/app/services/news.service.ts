import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { News } from '../types/news.type';
import { Observable } from 'rxjs';
import { NewsDefaultRequest } from '../types/news-default-request.type';
import { NewsDefaultResponse } from '../types/new-default-response.type';

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

  create(data: NewsDefaultRequest): Observable<NewsDefaultResponse>{
    return this.httpCilent.post<NewsDefaultResponse>(this.apiURL,data);
  }
}
