import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { AdminCategoryService } from '../../services/admin/admin-category.service';
import { ILoai, ILoaiCreate } from '../../database/data';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { Toast } from 'ngx-toastr';

@Component({
  selector: 'app-ad-category-add',
  imports: [CommonModule, RouterModule, RouterLink, FormsModule],
  templateUrl: './ad-category-add.component.html',
  styleUrl: './ad-category-add.component.css'
})
export class AdCategoryAddComponent {

  newCategory: ILoaiCreate = {
    ten_loai: '',
    slug: '',
    thu_tu: 0,
    an_hien: 1,
  };

  constructor(
    private categoryService: AdminCategoryService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  createCategory() {
    const payload: ILoaiCreate = {
      ...this.newCategory,
      thu_tu: Number(this.newCategory.thu_tu),
      an_hien: Number(this.newCategory.an_hien)
    };
    this.categoryService.createCategory(payload).subscribe({
      next: () => {
        this.toastr.success('Danh mục đã được tạo thành công');
        setTimeout(() => {
          this.router.navigate(['/admin/category']);
        }, 2000);
      },
      error: (err: any) => {
        this.toastr.error(err.error?.message || 'Đã xảy ra lỗi khi tạo danh mục');
      }
    });
  }
}
