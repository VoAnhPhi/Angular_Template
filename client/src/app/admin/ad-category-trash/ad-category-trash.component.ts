import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { AdminCategoryService } from '../../services/admin/admin-category.service';
import { ILoai } from '../../database/data';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-ad-category-trash',
  imports: [CommonModule, RouterModule, RouterLink, FormsModule],
  templateUrl: './ad-category-trash.component.html',
  styleUrl: './ad-category-trash.component.css'
})

export class AdCategoryTrashComponent {
  categories: ILoai[] = [];
  selectedCategory: ILoai | null = null;
  newCategory: ILoai = {
    id: 0,
    ten_loai: '',
    thu_tu: 0,
    an_hien: 1,
  };

  constructor(
    private categoryService: AdminCategoryService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.getTrashCategories();
  }

  getTrashCategories() {
    this.categoryService.getTrashCategories().subscribe(categories => {
      this.categories = categories;
      console.log(categories);
    });
  }

  restoreCategory(id: number) {
    Swal.fire({
      title: 'Bạn có chắc muốn khôi phục danh mục này chứ',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Khôi phục',
      cancelButtonText: 'Hủy',
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoryService.restoreCategory(id).subscribe({
          next: () => {
            this.categories = this.categories.filter(c => c.id !== id);
            this.toastr.success('Danh mục đã được khôi phục');
          },
          error: (err: any) => {
            this.toastr.error(err.error?.message || 'Đã xảy ra lỗi khi khôi phục');
          }
        });
      }
    });
  }

  forceDeleteCategory(id: number) {
    Swal.fire({
      title: 'Bạn có chắc muốn xóa danh mục này vĩnh viễn chứ',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Hủy',
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoryService.forceDeleteCategory(id).subscribe({
          next: () => {
            this.categories = this.categories.filter(c => c.id !== id);
            this.toastr.success('Danh mục đã được xóa vĩnh viễn');
          },
          error: (err: any) => {
            this.toastr.error(err.error?.message || 'Đã xảy ra lỗi khi xóa');
          }
        });
      }
    });
  }
}

