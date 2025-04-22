import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ILoai, ISanPham } from '../../database/data';
import { CategoryComponent } from '../../components/category/category.component';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-products-bycategory',
  imports: [CommonModule, RouterModule, CategoryComponent],
  templateUrl: './products-bycategory.component.html',
  styleUrl: './products-bycategory.component.css'
})
export class ProductsBycategoryComponent {
  constructor(private route: ActivatedRoute, public cartService: CartService) { }
  product_array: ISanPham[] = [];
  category_id: number = 0;
  category: ILoai = {} as ILoai;

  total_pages: number = 0;
  current_page: number = 1;
  total_items: number = 0;

  ngOnInit() {
    // Lắng nghe thay đổi trên URL
    this.route.paramMap.subscribe(params => {
      this.category_id = Number(params.get('category'));
      this.loadCategory();
      this.loadProducts();
    });
    this.route.queryParamMap.subscribe(queryParams => {
      this.current_page = Number(queryParams.get('page')) || 1;
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

  // Gọi API lấy danh sách sản phẩm theo danh mục & trang
  loadProducts() {
    fetch(`http://localhost:3000/api/products/category/${this.category_id}/page/${this.current_page}`)
      .then(res => res.json())
      .then(data => {
        this.product_array = data.products;
        this.total_pages = data.pagination.totalPages;
        this.current_page = data.pagination.currentPage;
        this.total_items = data.total_items;
        if (this.total_pages > 1) {
          document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
        }
        console.log("Total Pages:", this.total_pages);
        console.log("Current Page:", this.current_page);
      })
      .catch(err => console.log(`Lỗi khi lấy sản phẩm: ${err}`, err));
  }

  // Gọi API lấy danh mục
  loadCategory() {
    fetch(`http://localhost:3000/api/loai/${this.category_id}`)
      .then(res => res.json())
      .then(data => {
        this.category = data as ILoai;
      })
      .catch(err => {
        console.log(`Lỗi khi lấy danh mục: ${err}`, err);
      });
  }
}
