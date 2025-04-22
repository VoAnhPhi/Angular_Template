import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule, ActivatedRoute, Router } from '@angular/router';
import { ILoai, ISanPham, IAttributes, ProductResponse } from '../../database/data';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { Toast } from 'ngx-toastr';
import { AdminCategoryService } from '../../services/admin/admin-category.service';
import { AdminProductService } from '../../services/admin/admin-product.service';


@Component({
  selector: 'app-ad-product',
  imports: [CommonModule, RouterModule, RouterLink, FormsModule],
  templateUrl: './ad-product.component.html',
  styleUrl: './ad-product.component.css'
})

export class AdProductComponent {
  products: ISanPham[] = [];
  categories: ILoai[] = [];
  productResponse: ProductResponse = {
    products: [],
    pagination: {
      total: 0,
      totalPages: 0,
      currentPage: 1,
      limit: 10
    }
  };
  currentPage: number = 1;
  selectedCategoryId: number | null = null;
  constructor(
    private productService: AdminProductService,
    private categoryService: AdminCategoryService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.queryParamMap.subscribe(queryParams => {
      this.currentPage = Number(queryParams.get('page')) || 1;
      const categoryIdParam = queryParams.get('category');
      this.selectedCategoryId = categoryIdParam ? Number(categoryIdParam) : null;
      this.loadProducts();
      this.loadCategories();
    })
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe({
      next: (categories: ILoai[]) => {
        this.categories = categories;
      },
      error: (error: any) => {
        this.toastr.error(error.error?.message || 'Đã xảy ra lỗi khi tải danh mục');
      }
    })
  }

  onCategoryChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const categoryId = selectElement.value;
    this.currentPage = 1;

    const queryParams: any = {
      page: 1,
      ...(categoryId && { category: categoryId })
    };
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: queryParams,
      queryParamsHandling: 'merge'
    });
  }

  loadProducts() {
    if (this.selectedCategoryId) {
      this.productService.getProductsByCategory(this.selectedCategoryId, this.currentPage).subscribe({
        next: (response: ProductResponse) => {
          this.productResponse = response;
          this.products = response.products;
          if (this.currentPage > 1) {
            document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
          }
        },
        error: (error: any) => {
          this.toastr.error(error.error?.message || 'Đã xảy ra lỗi khi tải sản phẩm theo danh mục');
        }
      })
    } else {
      this.productService.getProducts(this.currentPage).subscribe({
        next: (response: ProductResponse) => {
          this.productResponse = response;
          this.products = response.products;
          if (this.currentPage > 1) {
            document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
          }
        },
        error: (error: any) => {
          this.toastr.error(error.error?.message || 'Đã xảy ra lỗi khi tải sản phẩm');
        }
      })
    }
  }

  deleteProduct(id: number) {
    Swal.fire({
      title: 'Bạn có chắc chắn muốn xóa sản phẩm này không?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Hủy',
    })
      .then((result) => {
        if (result.isConfirmed) {
          this.productService.deleteProduct(id).subscribe({
            next: () => {
              this.products = this.products.filter(p => p.id !== id);
              this.toastr.success('Sản phẩm đã được xóa thành công');
            },
            error: (err: any) => {
              this.toastr.error(err.error?.message || 'Đã xảy ra lỗi khi xóa sản phẩm');
            }
          })
        }
      })
  }

  getVisiblePages(): (number | -1)[] {
    let pages: (number | -1)[] = [];

    if (this.productResponse.pagination.totalPages <= 1) return [1]; // Nếu chỉ có 1 trang, chỉ hiển thị 1

    // Luôn hiển thị trang đầu tiên
    pages.push(1);

    // Nếu trang hiện tại lớn hơn 3, thêm dấu "..."
    if (this.currentPage > 2) {
      pages.push(-1); // Dấu "..."
    }

    // Tính toán khoảng hiển thị trang ở giữa
    let start = Math.max(2, this.currentPage - 1);
    let end = Math.min(this.productResponse.pagination.totalPages - 1, this.currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // Nếu có nhiều trang hơn mức hiển thị, thêm dấu "..."
    if (this.currentPage < this.productResponse.pagination.totalPages - 2) {
      pages.push(-1);
    }

    // Luôn hiển thị trang cuối cùng nếu chưa có
    if (this.productResponse.pagination.totalPages > 1) {
      pages.push(this.productResponse.pagination.totalPages);
    }
    return pages;
  }
}
