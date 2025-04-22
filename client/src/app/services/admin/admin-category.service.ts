import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ILoai, ILoaiCreate } from '../../database/data';

@Injectable({
  providedIn: 'root'
})
export class AdminCategoryService {
  private apiUrl = 'http://localhost:3000/admin';
  constructor(private http: HttpClient) { }

  getCategories(): Observable<ILoai[]> {
    return this.http.get<ILoai[]>(`${this.apiUrl}/loai`);
  }

  getTrashCategories(): Observable<ILoai[]> {
    return this.http.get<ILoai[]>(`${this.apiUrl}/loai-da-xoa`);
  }

  getCategoryById(id: number): Observable<ILoai> {
    return this.http.get<ILoai>(`${this.apiUrl}/loai/${id}`);
  }

  createCategory(category: ILoaiCreate): Observable<ILoai> {
    return this.http.post<ILoai>(`${this.apiUrl}/loai`, category);
  }

  updateCategory(id: number, category: ILoai): Observable<ILoai> {
    return this.http.put<ILoai>(`${this.apiUrl}/loai/${id}`, category);
  }

  // delete 
  deleteCategory(id: number): Observable<{message: string, status: number}> {
    return this.http.delete<{message: string, status: number}>(`${this.apiUrl}/loai/${id}`);
  }

  restoreCategory(id: number): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/loai/khoi-phuc/${id}`, {});
  }

  forceDeleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/loai/xoa-vinh-vien/${id}`);
  }
}
