import { Component } from '@angular/core';
import { AdminNewsCategoryService } from '../../services/admin/admin-news-category.service';
import { ILoaiTin, ILoaiTinResponse } from '../../database/data';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ad-news-category',
  imports: [CommonModule, RouterModule, RouterLink, FormsModule],
  templateUrl: './ad-news-category.component.html',
  styleUrl: './ad-news-category.component.css'
})
export class AdNewsCategoryComponent {
  news_category: ILoaiTin[] = [];
  newsCategoryResponse: ILoaiTinResponse = {
    news_category: [],
    pagination: {
      total: 0,
      totalPages: 0,
      currentPage: 1,
      limit: 10
    }
  };
  constructor(
    private newsCategoryService: AdminNewsCategoryService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.loadNewsCategories();
  }

  loadNewsCategories() {
    this.newsCategoryService.getNewsCategory().subscribe(response => {
      this.newsCategoryResponse = response;
      this.news_category = response.news_category;
    });
  }

  deleteNewsCategory(id: number) {
    Swal.fire({
      title: 'Bạn có chắc chắn muốn xóa danh mục tin tức này không?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Hủy',
    }).then((result) => {
      if (result.isConfirmed) {
        this.newsCategoryService.deleteNewsCategory(id).subscribe(response => {
          this.toastr.success('Đã xóa danh mục tin tức thành công');
          this.loadNewsCategories();
        });
      }
    });
  }
}
