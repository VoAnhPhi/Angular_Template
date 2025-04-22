import { Component } from '@angular/core';
import { INewsResponse, INews, ILoaiTin } from '../../database/data';
import { AdminNewsService } from '../../services/admin/admin-news.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ad-news-trash',
  imports: [CommonModule, RouterModule, RouterLink, FormsModule],
  templateUrl: './ad-news-trash.component.html',
  styleUrl: './ad-news-trash.component.css'
})
export class AdNewsTrashComponent {
  news: INews[] = [];
  categories: ILoaiTin[] = [];

  constructor(private newsService: AdminNewsService, private toastr: ToastrService) { }

  ngOnInit() {
    this.getTrashNews();
  }

  getTrashNews() {
    this.newsService.getTrashNews().subscribe(news => {
      this.news = news;
    });
  }

  forceDeleteNews(id: number) {
    Swal.fire({
      title: 'Bạn có chắc chắn muốn xóa tin tức này không?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Hủy',
    })
      .then((result) => {
        if (result.isConfirmed) {
          this.newsService.forceDeleteNews(id).subscribe(news => {
            this.news = this.news.filter(n => n.id !== id);
            this.toastr.success('Tin tức đã được xóa vĩnh viễn');
          });
        }
      });
  }

  restoreNews(id: number) {
    Swal.fire({
      title: 'Bạn có chắc chắn muốn khôi phục tin tức này không?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Khôi phục',
      cancelButtonText: 'Hủy',
    })
      .then((result) => {
        if (result.isConfirmed) {
          this.newsService.restoreNews(id).subscribe(news => {
            this.news = this.news.filter(n => n.id !== id);
            this.toastr.success('Tin tức đã được khôi phục');
          });
        }
      });
  }
}
