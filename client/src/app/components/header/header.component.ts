import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { IUser } from '../../database/data';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private cartService: CartService, private userService: UserService) {
    this.userService.user$.subscribe(user => {
      this.user = user;
    });
  }

  user: IUser | null = null;

  getCartCount() {
    return this.cartService.countProduct();
  }
}
