import { Injectable } from '@angular/core';
import { ISanPham, ICartItem } from '../database/data';

@Injectable({
  providedIn: 'root'    
})

export class CartService {
  addToCart(product: ISanPham) {
    let product_arr = JSON.parse(localStorage.getItem("cart") || '[]') as ICartItem[];
    let item = product_arr.findIndex(item => item.id === product.id);
    if (item >= 0) { product_arr[item].so_luong += 1; } else {
      product_arr.push({
        id: product.id,
        ten_sp: product.ten_sp,
        so_luong: 1,
        gia_mua: product.gia,
        hinh: product.hinh
      })
    }
    localStorage.setItem("cart", JSON.stringify(product_arr));
  }

  loadCart() {
    if (typeof localStorage !== 'undefined') {
      let product_arr = JSON.parse(localStorage.getItem("cart") || '[]') as ICartItem[];
      return product_arr;
    } else {
      return [];
    }
  }

  updateQuantity(id: number, quantity: number) {
    let product_arr = JSON.parse(localStorage.getItem("cart") || '[]') as ICartItem[];
    let item = product_arr.findIndex(item => item.id === id);
    if (item !== -1 && quantity > 0) {
      product_arr[item].so_luong = quantity;
    } else if (item !== -1 && quantity <= 0) {
      product_arr.splice(item, 1);
    }
    localStorage.setItem("cart", JSON.stringify(product_arr));
  }

  deleteProduct(id: number) {
    let product_arr = JSON.parse(localStorage.getItem("cart") || '[]') as ICartItem[];
    let item = product_arr.findIndex(item => item.id === id);
    if (item >= 0) {
      product_arr.splice(item, 1);
    }
    localStorage.setItem("cart", JSON.stringify(product_arr));
  }

  deleteAllProduct() { localStorage.removeItem('cart') }

  // hàm đếm sản phẩm có trong giỏ hàng để hiển thị trên header
  countProduct() {
    if (typeof localStorage !== 'undefined') {
      let product_arr = JSON.parse(localStorage.getItem("cart") || '[]') as ICartItem[];
      return product_arr.length;
    } else {
      return 0;
    }
  }
}