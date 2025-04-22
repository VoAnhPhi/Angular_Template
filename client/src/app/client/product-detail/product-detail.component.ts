import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ISanPham } from '../../database/data';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule, RouterModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})

export class ProductDetailComponent {
  constructor(private route: ActivatedRoute, public cartService: CartService) { }
  slug: string = '';
  product: ISanPham = {} as ISanPham;
  similarProducts: ISanPham[] = [];

  ngOnInit() {
    //  document is not defined
    if (typeof document !== 'undefined') {
      document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
    }

    this.slug = this.route.snapshot.paramMap.get('slug') || '';
    console.log(this.slug);
    fetch(`http://localhost:3000/api/sp/${this.slug}`)
      .then(res => res.json())
      .then(data => {
        this.product = data as ISanPham;
        fetch(`http://localhost:3000/api/sp/${this.slug}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ luot_xem: this.product.luot_xem + 1 })
        })
        this.product.id_loai = data.id_loai;
        fetch(`http://localhost:3000/api/products/same-category/${this.product.id_loai}`)
          .then(res => res.json())
          .then(data => {
            this.similarProducts = data as ISanPham[];
          })
          .catch(err => {
            console.log(err);
          })
      })
      .catch(err => {
        console.log(err);
      })
  }
}
