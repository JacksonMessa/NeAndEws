import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { News } from '../types/news.type';
import { Observable } from 'rxjs';
import { NewsDefaultRequest } from '../types/news-default-request.type';
import { NewsDefaultResponse } from '../types/new-default-response.type';
import { NewsGetResponse } from '../types/news-get-response.type';

@Injectable({
  providedIn: 'root'
})



export class NewsService {

  private readonly apiURL: string = "http://localhost:8080/news-api/news"

  constructor(private httpCilent: HttpClient,
  ) { }

  getAll(page:number, pageSize:number): Observable<NewsGetResponse> {
    let getParams:HttpParams = new HttpParams()
    .set("page", page)
    .set("pageSize", pageSize);
    return this.httpCilent.get<NewsGetResponse>(this.apiURL,{params: getParams});
  }

  get(id:string): Observable<News> {
    return this.httpCilent.get<News>(this.apiURL+"/"+id);
  }

  create(data: NewsDefaultRequest): Observable<NewsDefaultResponse>{
    return this.httpCilent.post<NewsDefaultResponse>(this.apiURL,data);
  }

  update(data: NewsDefaultRequest, id:string|null): Observable<NewsDefaultResponse>{
    return this.httpCilent.put<NewsDefaultResponse>(`${this.apiURL}/${id}`,data);
  }

  delete(id:string){
    return this.httpCilent.delete<NewsDefaultResponse>(`${this.apiURL}/${id}`);
  }
}
