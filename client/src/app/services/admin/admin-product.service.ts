import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ISanPham, ISanPhamCreate, ProductResponse } from '../../database/data';

@Injectable({
  providedIn: 'root'
})
export class AdminProductService {
  private apiUrl = 'http://localhost:3000/admin';
  constructor(private http: HttpClient) { }

  getProducts(page: number = 1): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(`${this.apiUrl}/product/page/${page}`);
  }

  getProductsByCategory(categoryId: number, page: number = 1): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(`${this.apiUrl}/product/category/${categoryId}/page/${page}`);
  }

  getTrashProducts(page: number = 1): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(`${this.apiUrl}/product-da-xoa/page/${page}`);
  }

  getProductById(id: number): Observable<ISanPham> {
    return this.http.get<ISanPham>(`${this.apiUrl}/product/${id}`);
  }

  updateProduct(id: number, product: FormData): Observable<ISanPham> {
    return this.http.put<ISanPham>(`${this.apiUrl}/product/${id}`, product);
  }

  addProduct(product: FormData): Observable<ISanPham> {
    return this.http.post<ISanPham>(`${this.apiUrl}/product`, product);
  }

  deleteProduct(id: number): Observable<{ message: string, status: number }> {
    return this.http.delete<{ message: string, status: number }>(`${this.apiUrl}/product/${id}`);
  }

  restoreProduct(id: number): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/product/khoi-phuc/${id}`, {});
  }

  forceDeleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/product/xoa-vinh-vien/${id}`);
  }
}
