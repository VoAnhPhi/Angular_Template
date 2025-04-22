import { Component } from '@angular/core';
import { ICartItem } from '../../database/data';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css'
})

export class CartPageComponent {
  constructor(public cartService: CartService, private router: Router) { }

  cartData = {
    items: [] as ICartItem[],
    subtotal: 0,
    shipping: 50000,
    total: 0
  };

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

  updateQuantity(id: number, quantity: number) {
    this.cartService.updateQuantity(id, quantity);
    this.loadCart();
  }

  deleteProduct(id: number) {
    this.cartService.deleteProduct(id);
    this.loadCart();
  }

  deleteAllProduct() {
    this.cartService.deleteAllProduct();
    this.loadCart();
  }

  checkout() {
    this.router.navigate(['/checkout']);
  }

  ngOnInit() {
    this.loadCart();
  }

}
