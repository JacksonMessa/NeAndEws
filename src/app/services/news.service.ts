import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { News } from '../types/news.type';
import { Observable } from 'rxjs';
import { NewsDefaultRequest } from '../types/news-default-request.type';
import { NewsDefaultResponse } from '../types/new-default-response.type';
import { NewsGetResponse } from '../types/news-get-response.type';
import { GetRequestFilter } from '../types/get-request-filter.type';

@Injectable({
  providedIn: 'root'
})



export class NewsService {

  private readonly apiURL: string = "http://localhost:8080/news-api/news"

  constructor(private httpCilent: HttpClient,
  ) { }

  getAll(page:number, pageSize:number, filterData:GetRequestFilter): Observable<NewsGetResponse> {
    let getParams:HttpParams = new HttpParams()
    .set("page", page)
    .set("pageSize", pageSize)

    if (filterData.title!=null) getParams = getParams.set("title",filterData.title);
    if (filterData.writer!=null) getParams = getParams.set("writer",filterData.writer);
    if (filterData.publicationDate!=null){
      const dateArray:string[] = filterData.publicationDate.toString().split("-");
      const formattedDate: string = `${dateArray[2]}/${dateArray[1]}/${dateArray[0]}`
      getParams = getParams.set("publicationDate",formattedDate);
    } 
    
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
