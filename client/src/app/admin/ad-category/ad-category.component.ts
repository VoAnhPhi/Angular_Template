import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { AdminCategoryService } from '../../services/admin/admin-category.service';
import { ILoai } from '../../database/data';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { Toast } from 'ngx-toastr';

@Component({
  selector: 'app-ad-category',
  imports: [CommonModule, RouterModule, RouterLink, FormsModule],
  templateUrl: './ad-category.component.html',
  styleUrl: './ad-category.component.css'
})

export class AdCategoryComponent {
  categories: ILoai[] = [];

  constructor(
    private categoryService: AdminCategoryService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  deleteCategory(id: number) {
    Swal.fire({
      title: 'Bạn có chắc chắn muốn xóa danh mục này không?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Hủy',
    })
      .then((result) => {
        if (result.isConfirmed) {
          this.categoryService.deleteCategory(id).subscribe({
            next: () => {
              this.categories = this.categories.filter(c => c.id !== id);
              this.toastr.success('Danh mục đã được xóa thành công');
            },
            error: (err: any) => {
              this.toastr.error(err.error?.message || 'Đã xảy ra lỗi khi xóa');
            }
          });
        }
      });
  }
}

