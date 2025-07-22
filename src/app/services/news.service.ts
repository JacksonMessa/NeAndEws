import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { News } from '../types/news.type';
import { Observable } from 'rxjs';

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
}
