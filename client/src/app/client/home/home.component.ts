import { Component } from '@angular/core';
import { ProductsHotComponent } from '../../components/products-hot/products-hot.component';
import { CategoryComponent } from '../../components/category/category.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [ProductsHotComponent, CategoryComponent, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
