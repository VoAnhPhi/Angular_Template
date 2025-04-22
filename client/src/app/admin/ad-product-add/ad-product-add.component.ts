import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule, Router } from '@angular/router';
import { ILoai, ISanPham, IAttributes, ProductResponse, ISanPhamCreate } from '../../database/data';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { Toast } from 'ngx-toastr';
import { AdminCategoryService } from '../../services/admin/admin-category.service';
import { AdminProductService } from '../../services/admin/admin-product.service';


@Component({
  selector: 'app-ad-product-add',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './ad-product-add.component.html',
  styleUrl: './ad-product-add.component.css'
})
export class AdProductAddComponent {
  selectedImage!: File;
  previewImageUrl: string | ArrayBuffer | null = null;
  product: ISanPhamCreate = {
    ten_sp: "",
    ngay: "",
    gia: 0,
    gia_km: 0,
    id_loai: 0,
    hot: "0",
    slug: "",
    an_hien: 0,
    hinh: "",
    mo_ta: "",
    tinh_chat: "0",
    luot_xem: 0,
    attributes: {
      ram: "",
      cpu: "",
      dia_cung: "",
      mau_sac: "",
      can_nang: "",
    }
  }
  categories: ILoai[] = [];
  constructor(
    private productService: AdminProductService,
    private categoryService: AdminCategoryService,
    private toastr: ToastrService,
    private router: Router
  ) { }

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

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  isSubmitting = false;

  addProduct() {
    // Validation checks
    if (!this.product.ten_sp) {
      this.toastr.warning('Tên sản phẩm không được để trống');
      return;
    }
    if (this.product.gia <= 0) {
      this.toastr.warning('Giá sản phẩm phải lớn hơn 0'); 
      return;
    }
    if (this.product.id_loai <= 0) {
      this.toastr.warning('Vui lòng chọn loại sản phẩm');
      return;
    }
    if (!this.selectedImage) {
      this.toastr.warning('Vui lòng chọn hình ảnh sản phẩm');
      return;
    }

    if (this.isSubmitting) {
      return;
    }
    this.isSubmitting = true;
    const formData = new FormData();

    formData.append("ten_sp", this.product.ten_sp);
    formData.append("slug", this.product.slug);
    formData.append("gia", this.product.gia.toString());
    formData.append("gia_km", this.product.gia_km.toString());
    formData.append("id_loai", this.product.id_loai.toString());
    formData.append("hot", this.product.hot.toString());
    formData.append("an_hien", this.product.an_hien.toString());
    formData.append("mo_ta", this.product.mo_ta);
    formData.append("tinh_chat", this.product.tinh_chat.toString());

    formData.append("attributes", JSON.stringify(this.product.attributes));
    if (this.selectedImage) {
      formData.append("hinh", this.selectedImage);
    }

    this.productService.addProduct(formData).subscribe({
      next: (product) => {
        this.toastr.success('Sản phẩm đã được thêm thành công');
        setTimeout(() => {
          this.router.navigate(['/admin/product']);
        }, 2000);
      },
      error: (err: any) => {
        this.toastr.error(err.error?.message || 'Đã xảy ra lỗi khi thêm sản phẩm');
        this.isSubmitting = false; // Reset on error
      },
      complete: () => {
        // Set submitting to false when the request completes (whether success or error handled)
        this.isSubmitting = false;
      }
    });
  }
}
