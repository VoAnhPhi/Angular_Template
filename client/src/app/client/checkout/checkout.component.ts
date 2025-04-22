import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ICartItem } from '../../database/data';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  imports: [FormsModule, CommonModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})

export class CheckoutComponent {
  constructor(public cartService: CartService, private router: Router) { }
  order = { ho_ten: '', email: '', ghi_chu: '', dia_chi: '' };
  thong_bao: string = "";
  isError: boolean = false;
  isSubmitting: boolean = false;

  cartData = {
    items: [] as ICartItem[],
    subtotal: 0,
    shipping: 50000,
    total: 0
  };

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    const items = this.cartService.loadCart();
    const subtotal = items.reduce((total, product) => total + product.gia_mua * product.so_luong, 0);
    const shipping = 50000;
    const total = subtotal + shipping;
    this.cartData = {
      items,
      subtotal,
      shipping,
      total
    };
  }

  luudonhang() {
    if (this.isSubmitting) return;
    this.isSubmitting = true;
    let listSP: ICartItem[] = this.cartService.loadCart();

    if (listSP.length == 0) {
      this.thong_bao = "Bạn Chưa Có Sản Phẩm Nào Trong Giỏ Hàng";
      this.isError = true;
      this.isSubmitting = false;
      return;
    }

    if (this.order.ho_ten.trim() == "") {
      this.thong_bao = "Bạn Chưa Nhập Họ Tên";
      this.isError = true;
      this.isSubmitting = false;
      document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (this.order.email.trim() == "") {
      this.thong_bao = "Bạn Chưa Nhập Email";
      this.isError = true;
      this.isSubmitting = false;
      document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (this.order.dia_chi.trim() == "") {
      this.thong_bao = "Bạn Chưa Nhập Địa Chỉ Để Giao Hàng";
      document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
      this.isError = true;
      this.isSubmitting = false;
      return;
    }

    this.thong_bao = "";
    this.isError = false;

    let opt = {
      method: "post", body: JSON.stringify(this.order),
      headers: { 'Content-Type': 'application/json' }
    }
    fetch(`http://localhost:3000/api/luudonhang`, opt)
      .then(res => res.json())
      .then(data => {
        this.thong_bao = data.thong_bao;
        if (data.dh != undefined) {
          let id_dh = data.dh.id;
          this.luugiohangchitiet(id_dh);
        }
        if (this.isError === false) {
          this.cartService.deleteAllProduct();
          this.loadCart();
        }
        this.isSubmitting = false;
      })
      .catch(error => {
        this.thong_bao = "Đã có lỗi xảy ra khi lưu đơn hàng";
        this.isError = true;
        this.isSubmitting = false;
        document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
      });
  }

  luugiohangchitiet(id_dh: number) {
    let listSP: ICartItem[] = this.cartService.loadCart();
    for (let i = 0; i < listSP.length; i++) {
      let sp = listSP[i];
      let t = { id_dh: id_dh, id_sp: sp.id, so_luong: sp.so_luong };
      let opt = {
        method: "POST", body: JSON.stringify(t),
        headers: { 'Content-Type': 'application/json' }
      };
      fetch("http://localhost:3000/api/luugiohang", opt)
        .then(res => res.json())
        .then(data => {
          if (data.status == 200) {
            this.thong_bao = "Đã lưu đơn hàng thành công";
            this.isError = false;
            document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
            setTimeout(() => {
              this.router.navigate(['']);
            }, 3000);
          } else {
            this.thong_bao = "Đã có lỗi xảy ra khi lưu đơn hàng";
            this.isError = true;
          }
        })
        .catch(err => console.log('Lỗi lưu sản phẩm', sp));
    }
  }

}
