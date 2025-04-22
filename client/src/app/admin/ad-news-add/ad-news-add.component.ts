import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AdminNewsService } from '../../services/admin/admin-news.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ILoaiTin, INewsCreate } from '../../database/data';
import { AdminNewsCategoryService } from '../../services/admin/admin-news-category.service';

@Component({
  selector: 'app-ad-news-add',
  imports: [CommonModule, RouterModule, RouterLink, FormsModule],
  templateUrl: './ad-news-add.component.html',
  styleUrl: './ad-news-add.component.css'
})
export class AdNewsAddComponent implements OnInit {
  selectedImage!: File;
  previewImageUrl: string | ArrayBuffer | null = null;
  categories: ILoaiTin[] = [];
  news: INewsCreate = {
    tieu_de: '',
    slug: '',
    mo_ta: '',
    hinh: '',
    noi_dung: '',
    ngay: '',
    id_loai: 0,
    luot_xem: 0,
    an_hien: 0,
  };

  constructor(
    private newsService: AdminNewsService,
    private categoryService: AdminNewsCategoryService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getNewsCategory().subscribe(categories => this.categories = categories.news_category);
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = file;
      this.previewImageUrl = URL.createObjectURL(file);

      const render = new FileReader();
      render.onload = (e: any) => {
        this.previewImageUrl = e.target?.result;
      }
      render.readAsDataURL(file);
    }
  }

  isSubmitting = false;

  createNews() {
    if (!this.news.tieu_de) {
      this.toastr.warning('Tên tin tức không được để trống');
      return;
    }

    if (!this.selectedImage) {
      this.toastr.warning('Vui lòng chọn hình ảnh tin tức');
      return;
    }

    const today = new Date();
    const selectedDate = new Date(this.news.ngay);

    if (selectedDate > today) {
      this.toastr.warning('Ngày đăng không được lớn hơn ngày hiện tại');
      return;
    }

    const formData = new FormData();
    formData.append('tieu_de', this.news.tieu_de);
    formData.append('slug', this.news.slug);
    formData.append('mo_ta', this.news.mo_ta);
    formData.append('noi_dung', this.news.noi_dung);
    formData.append('ngay', this.news.ngay);
    formData.append('id_loai', this.news.id_loai.toString());
    formData.append('luot_xem', this.news.luot_xem.toString());
    formData.append('an_hien', this.news.an_hien.toString());
    if (this.selectedImage) {
      formData.append('hinh', this.selectedImage);
    }
    this.isSubmitting = true;

    this.newsService.createNews(formData).subscribe({
      next: (news) => {
        this.toastr.success('Tin tức đã được tạo thành công');
        setTimeout(() => {
          this.router.navigate(['/admin/news']);
        }, 2000);
      },
      error: (err: any) => {
        this.toastr.error(err.error?.message || 'Đã xảy ra lỗi khi tạo tin tức');
        this.isSubmitting = false;
      },
      complete: () => {
        this.isSubmitting = false;
      }
    });
  }

}
