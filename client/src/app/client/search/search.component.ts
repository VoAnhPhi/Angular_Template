import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ILoai, ISanPham } from '../../database/data';
import { CategoryComponent } from '../../components/category/category.component';

@Component({
  selector: 'app-search',
  imports: [CommonModule, RouterModule, CategoryComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})

export class SearchComponent {
  constructor(private route: ActivatedRoute) { }
  product_array: ISanPham[] = [];
  category_array: ILoai[] = [];
  key: string = '';

  total_pages: number = 0;
  current_page: number = 1;
  total_items: number = 0;

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      this.key = params.get('key') || '';
      console.log(this.key);
      this.loadProducts();
    })
    this.route.queryParamMap.subscribe(params => {
      this.current_page = Number(params.get('page')) || 1;
      this.loadProducts();
    });
  }

  getVisiblePages(): (number | -1)[] {
    let pages: (number | -1)[] = [];

    if (this.total_pages <= 1) return [1]; // Nếu chỉ có 1 trang, chỉ hiển thị 1

    // Luôn hiển thị trang đầu tiên
    pages.push(1);

    // Nếu trang hiện tại lớn hơn 3, thêm dấu "..."
    if (this.current_page > 3) {
      pages.push(-1); // Dấu "..."
    }

    // Tính toán khoảng hiển thị trang ở giữa
    let start = Math.max(3, this.current_page - 1);
    let end = Math.min(this.total_pages - 1, this.current_page + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // Nếu có nhiều trang hơn mức hiển thị, thêm dấu "..."
    if (this.current_page < this.total_pages - 2) {
      pages.push(-1);
    }

    // Luôn hiển thị trang cuối cùng nếu chưa có
    if (this.total_pages > 1) {
      pages.push(this.total_pages);
    }

    return pages;
  }

  loadProducts() {
    fetch(`http://localhost:3000/api/search/${this.key}/page/${this.current_page}`)
      .then(response => response.json())
      .then(data => {
        this.product_array = data.products;
        this.total_pages = data.pagination.totalPages;
        this.current_page = data.pagination.currentPage;
        this.total_items = data.total_items;
        console.log("Total Pages:", this.total_pages);
        console.log("Current Page:", this.current_page);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }
}