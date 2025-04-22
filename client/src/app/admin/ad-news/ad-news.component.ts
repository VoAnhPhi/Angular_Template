import { Component } from '@angular/core';
import { AdminNewsService } from '../../services/admin/admin-news.service';
import { INews, INewsCreate, ILoaiTin, INewsResponse } from '../../database/data';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-ad-news',
  imports: [CommonModule, RouterModule, RouterLink, FormsModule],
  templateUrl: './ad-news.component.html',
  styleUrl: './ad-news.component.css'
})
export class AdNewsComponent {
  news: INews[] = [];
  categories: ILoaiTin[] = [];
  newsResponse: INewsResponse = {
    news: [],
    pagination: {
      total: 0,
      totalPages: 0,
      currentPage: 1,
      limit: 10
    }
  };
  
  constructor(
    private newsService: AdminNewsService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
        this.loadNews();
      }

  loadNews() {
        this.newsService.getNews().subscribe(news => {
          this.news = news.news;
          console.log(this.news);
        });
      }

  deleteNews(id: number) {
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
              this.newsService.deleteNews(id).subscribe({
                next: () => {
                  this.news = this.news.filter(n => n.id !== id);
                  this.toastr.success('Tin tức đã được xóa thành công');
                },
                error: (err: any) => {
                  this.toastr.error(err.error?.message || 'Đã xảy ra lỗi khi xóa tin tức');
                }
              });
            }
          });
      }
    }
