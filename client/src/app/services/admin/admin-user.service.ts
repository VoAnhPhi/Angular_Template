import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser, IUserResponse } from '../../database/data';

@Injectable({
  providedIn: 'root'
})
export class AdminUserService {

  constructor(private http: HttpClient) { }
  private apiUrl = 'http://localhost:3000/admin';

  getUser(page: number = 1): Observable<IUserResponse> {
    return this.http.get<IUserResponse>(`${this.apiUrl}/user/page/${page}`);
  }

  getTrashUser(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${this.apiUrl}/user-da-xoa`);
  }

  getUserById(id: number): Observable<IUser> {
      return this.http.get<IUser>(`${this.apiUrl}/user/${id}`);
  }

  createUser(user: FormData): Observable<IUser> {
    return this.http.post<IUser>(`${this.apiUrl}/user`, user);
  }

  updateUser(id: number, user: FormData): Observable<IUser> {
    return this.http.put<IUser>(`${this.apiUrl}/user/${id}`, user);
  }

  // delete 
  deleteUser(id: number): Observable<{message: string, status: number}> {
    return this.http.delete<{message: string, status: number}>(`${this.apiUrl}/user/${id}`);
  }

  restoreUser(id: number): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/user/khoi-phuc/${id}`, {});
  }

  forceDeleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/user/xoa-vinh-vien/${id}`);
  }
}
