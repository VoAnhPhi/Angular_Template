import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { INews, ILoaiTin } from '../../database/data';

@Component({
  selector: 'app-news',
  imports: [CommonModule, RouterModule],
  templateUrl: './news.component.html',
  styleUrl: './news.component.css'
})
export class NewsComponent {
  constructor(private route: ActivatedRoute) { }
  news_array: INews[] = [];
  categories_news: ILoaiTin[] = [];
  current_page: number = 1;
  total_pages: number = 0;
  total_items: number = 0;

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.current_page = Number(params['page']) || 1;
      this.loadNews();  
    });
  }

  getNews() {
    fetch(`http://localhost:3000/api/news/page/${this.current_page}`)
      .then(res => res.json())
      .then(data => {
        this.news_array = data.news_arr;
      })
      .catch(err => console.log(`Lỗi khi lấy tin tức: ${err}`, err));
  }

  getCategoriesNews() {
    fetch(`http://localhost:3000/api/news/loai_tin`)
      .then(response => response.json())
      .then(data => {
        this.categories_news = data;
      })
      .catch(err => console.log(`Lỗi khi lấy danh mục tin tức: ${err}`, err));
  }

  loadNews() {
    this.getNews();
    this.getCategoriesNews();
  }

}
