import { HttpClient } from '@angular/common/http';
import { INews, INewsResponse, INewsCreate } from '../../database/data';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AdminNewsService {

  constructor(private http: HttpClient) { }
  private apiUrl = 'http://localhost:3000/admin';

  getNews(page: number = 1): Observable<INewsResponse> {
    return this.http.get<INewsResponse>(`${this.apiUrl}/news/page/${page}`);
  }

  getTrashNews(): Observable<INews[]> {
    return this.http.get<INews[]>(`${this.apiUrl}/news-da-xoa`);
  }

  getNewsById(id: number): Observable<INews> {
    return this.http.get<INews>(`${this.apiUrl}/news/${id}`);
  }

  createNews(news: FormData): Observable<INews> {
    return this.http.post<INews>(`${this.apiUrl}/news`, news);
  }

  updateNews(id: number, news: FormData): Observable<INews> {
    return this.http.put<INews>(`${this.apiUrl}/news/${id}`, news);
  }

  // delete 
  deleteNews(id: number): Observable<{message: string, status: number}> {
    return this.http.delete<{message: string, status: number}>(`${this.apiUrl}/news/${id}`);
  }

  restoreNews(id: number): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/news/khoi-phuc/${id}`, {});
  }

  forceDeleteNews(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/news/xoa-vinh-vien/${id}`);
  }
}
