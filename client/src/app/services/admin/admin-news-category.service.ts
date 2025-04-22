import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ILoaiTin, ILoaiTinResponse, ILoaiTinCreate } from '../../database/data';


@Injectable({
  providedIn: 'root'
})
export class AdminNewsCategoryService {

  constructor(private http: HttpClient) { }
  private apiUrl = 'http://localhost:3000/admin';

  getNewsCategory(page: number = 1): Observable<ILoaiTinResponse> {
    return this.http.get<ILoaiTinResponse>(`${this.apiUrl}/news_category/page/${page}`);
  }

  getTrashNewsCategory(): Observable<ILoaiTin[]> {
    return this.http.get<ILoaiTin[]>(`${this.apiUrl}/news_category-da-xoa`);
  }

  getNewsCategoryById(id: number): Observable<ILoaiTin> {
    return this.http.get<ILoaiTin>(`${this.apiUrl}/news_category/${id}`);
  }

  createNewsCategory(newsCategory: ILoaiTinCreate): Observable<ILoaiTin> {
    return this.http.post<ILoaiTin>(`${this.apiUrl}/news_category`, newsCategory);
  }

  updateNewsCategory(id: number, newsCategory: ILoaiTin): Observable<ILoaiTin> {
    return this.http.put<ILoaiTin>(`${this.apiUrl}/news_category/${id}`, newsCategory);
  }

  deleteNewsCategory(id: number): Observable<ILoaiTin> {
    return this.http.delete<ILoaiTin>(`${this.apiUrl}/news_category/${id}`);
  }

  restoreNewsCategory(id: number): Observable<ILoaiTin> {
    return this.http.patch<ILoaiTin>(`${this.apiUrl}/news_category/khoi-phuc/${id}`, {});
  }

  forceDeleteNewsCategory(id: number): Observable<ILoaiTin> {
    return this.http.delete<ILoaiTin>(`${this.apiUrl}/news_category/xoa-vinh-vien/${id}`);
  }
}