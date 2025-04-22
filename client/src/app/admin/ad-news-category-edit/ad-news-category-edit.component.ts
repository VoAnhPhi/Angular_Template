import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterModule, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { AdminNewsCategoryService } from '../../services/admin/admin-news-category.service';
import { ILoaiTin, ILoaiTinCreate } from '../../database/data';

@Component({
  selector: 'app-ad-news-category-edit',
  imports: [CommonModule, RouterModule, RouterLink, FormsModule],
  templateUrl: './ad-news-category-edit.component.html',
  styleUrl: './ad-news-category-edit.component.css'
})
export class AdNewsCategoryEditComponent implements OnInit {
  categories: ILoaiTin[] = [];
  newsCategoryForm: ILoaiTin = {
    id: 0,
    ten_loai: '',
    slug: '',
    an_hien: 1,
    thu_tu: 0,
    count: 0
  };


  constructor(
    private formBuilder: FormBuilder,
    private newsCategoryService: AdminNewsCategoryService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      const id = params['id'];
      this.newsCategoryService.getNewsCategoryById(id).subscribe(newsCategory => {
        this.newsCategoryForm = newsCategory;
      });
    });
  }

  isSubmitting = false;

  updateNewsCategory() {
    this.newsCategoryForm.an_hien = Number(this.newsCategoryForm.an_hien);
    this.newsCategoryService.updateNewsCategory(this.newsCategoryForm.id, this.newsCategoryForm).subscribe({
      next: (response) => {
        this.toastr.success('Danh mục tin tức đã được cập nhật thành công');
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
