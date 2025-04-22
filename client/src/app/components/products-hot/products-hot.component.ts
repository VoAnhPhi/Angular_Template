import { Component } from '@angular/core';
import { ISanPham } from '../../database/data';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-products-hot',
  imports: [CommonModule, RouterModule],
  templateUrl: './products-hot.component.html',
  styleUrl: './products-hot.component.css'
})
export class ProductsHotComponent {
  constructor(public cartService: CartService) { }
  product_array: ISanPham[] = [];
  ngOnInit() {
    fetch('http://localhost:3000/api/sphot/9')
      .then((res) => res.json())
      .then((data) => {
        this.product_array = data as ISanPham[];
      })
      .catch((err) => {
        console.log(`Lỗi khi lấy sản phẩm hót: ${err}`, err);
      });
  }
}
