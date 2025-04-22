import { Component } from '@angular/core';
import { ILoai } from '../../database/data';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category',
  imports: [RouterModule, CommonModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {
  category_array: ILoai[] = [];

  ngOnInit() {
    fetch('http://localhost:3000/api/loai')
      .then((res) => res.json())
      .then((data) => {
        this.category_array = data as ILoai[];
      })
      .catch((err) => {
        console.log(`Lỗi khi lấy danh mục: ${err}`, err);
      });
  }
}
