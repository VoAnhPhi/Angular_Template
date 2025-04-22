import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { INews, ILoaiTin } from '../../database/data';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-news-detail',
  imports: [CommonModule, RouterModule],
  templateUrl: './news-detail.component.html',
  styleUrl: './news-detail.component.css'
})

export class NewsDetailComponent {  
  constructor(private route: ActivatedRoute) { }
  slug: string = '';
  news: INews = {} as INews;
  relatedNews: INews[] = [];
  categories_news: ILoaiTin[] = [];

  getCategoriesNews() {
    fetch(`http://localhost:3000/api/news/loai_tin`)
      .then(response => response.json())
      .then(data => {
        this.categories_news = data;
      })
  }

  ngOnInit() {
    this.getCategoriesNews();
    this.slug = this.route.snapshot.paramMap.get('slug') || '';
    console.log(this.slug);
    fetch(`http://localhost:3000/api/news/${this.slug}`)
      .then(res => res.json())
      .then(data => {
        this.news = data as INews;
        this.news.id_loai = data.id_loai;
        console.log(this.news);
        // lấy tin tức liên quan
        fetch(`http://localhost:3000/api/news/related/${this.news.id_loai}`)
          .then(res => res.json())
          .then(data => {
            this.relatedNews = data as INews[];
            console.log(this.relatedNews);
          })
          .catch(err => {
            console.log(err);
          })
      }) 
      .catch(err => {
        console.log(err);
      })
  }
}
