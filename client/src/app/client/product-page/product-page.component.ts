import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ISanPham } from '../../database/data';
import { CategoryComponent } from '../../components/category/category.component';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-page',
  imports: [CommonModule, RouterModule, CategoryComponent],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css'
})

export class ProductPageComponent {
  constructor(private route: ActivatedRoute, public cartService: CartService) { }
  product_array: ISanPham[] = [];

  total_pages: number = 0;
  current_page: number = 1;
  total_items: number = 0;

  getVisiblePages(): (number | -1)[] {
    let pages: (number | -1)[] = [];

    if (this.total_pages <= 1) return [1]; // Nếu chỉ có 1 trang, chỉ hiển thị 1

    // Luôn hiển thị trang đầu tiên
    pages.push(1);

    // Nếu trang hiện tại lớn hơn 3, thêm dấu "..."
    if (this.current_page > 2) {
      pages.push(-1); // Dấu "..."
    }

    // Tính toán khoảng hiển thị trang ở giữa
    let start = Math.max(2, this.current_page - 1);
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

  ngOnInit() {
    this.route.queryParamMap.subscribe(queryParams => {
      this.current_page = Number(queryParams.get('page')) || 1;
      this.loadProducts();
    });
  }

  loadProducts() {
    fetch(`http://localhost:3000/api/products/page/${this.current_page}`)
      .then(res => res.json())
      .then(data => {
        this.product_array = data.products;
        this.total_pages = data.pagination.totalPages;
        this.current_page = data.pagination.currentPage;
        this.total_items = data.total_items;
        if (this.total_pages > 1) {
          if (this.current_page > 1) {
            document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }

        console.log("Total Pages:", this.total_pages);
        console.log("Current Page:", this.current_page);
      })
      .catch(err => console.log(`Lỗi khi lấy sản phẩm: ${err}`, err));
  }

}