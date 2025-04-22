import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { AdminNewsCategoryService } from '../../services/admin/admin-news-category.service';
import { ILoaiTin, ILoaiTinCreate } from '../../database/data';

@Component({
  selector: 'app-ad-news-category-add',
  imports: [CommonModule, RouterModule, RouterLink, FormsModule],
  templateUrl: './ad-news-category-add.component.html',
  styleUrl: './ad-news-category-add.component.css'
})
export class AdNewsCategoryAddComponent implements OnInit {
  categories: ILoaiTin[] = [];
  newsCategoryForm: ILoaiTinCreate = {
    ten_loai: '',
    slug: '',
    an_hien: 1,
    thu_tu: 0
  };


  constructor(
    private formBuilder: FormBuilder,
    private newsCategoryService: AdminNewsCategoryService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
  }

  isSubmitting = false;

  createNewsCategory() {
    this.newsCategoryForm.an_hien = Number(this.newsCategoryForm.an_hien);
    this.newsCategoryService.createNewsCategory(this.newsCategoryForm).subscribe({
      next: (response) => {
        this.toastr.success('Danh mục tin tức đã được tạo thành công');
        setTimeout(() => {
          this.router.navigate(['/admin/news-category']);
        }, 2000);
      },
      error: (err: any) => {
        this.toastr.error(err.error?.message || 'Đã xảy ra lỗi khi tạo danh mục tin tức');
        this.isSubmitting = false;
      },
      complete: () => {
        this.isSubmitting = false;
      }
    });
  }
}
