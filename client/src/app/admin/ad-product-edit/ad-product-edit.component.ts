import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule, Router, ActivatedRoute } from '@angular/router';
import { ILoai, ISanPham, IAttributes, ProductResponse, ISanPhamCreate } from '../../database/data';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { Toast } from 'ngx-toastr';
import { AdminCategoryService } from '../../services/admin/admin-category.service';
import { AdminProductService } from '../../services/admin/admin-product.service';

@Component({
  selector: 'app-ad-product-edit',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './ad-product-edit.component.html',
  styleUrl: './ad-product-edit.component.css'
})
export class AdProductEditComponent {
  selectedImage!: File;
  previewImageUrl: string | ArrayBuffer | null = null;


  product: ISanPham = {
    id: 0,  
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
      id: 0,
      id_sp: 0,
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
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.productService.getProductById(id).subscribe(product => {
        this.product = product;
      });
    });
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
    })
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = file;
      this.previewImageUrl = URL.createObjectURL(file);
    }
  }

  updateProduct() {
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

    this.productService.updateProduct(this.product.id, formData).subscribe({
      next: (product) => {
        this.toastr.success('Sản phẩm đã được cập nhật thành công');
        setTimeout(() => {
          this.router.navigate(['/admin/product']);
        }, 2000);
      },
      error: (err: any) => {
        this.toastr.error(err.error?.message || 'Đã xảy ra lỗi khi cập nhật sản phẩm');
      }
    })
  }
}
