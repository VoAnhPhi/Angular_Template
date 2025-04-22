import { Component, OnInit } from '@angular/core';
import { AdminUserService } from '../../services/admin/admin-user.service';
import { IUser, IUserResponse } from '../../database/data';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-ad-user',
  imports: [CommonModule, RouterModule, RouterLink, FormsModule],
  templateUrl: './ad-user.component.html',
  styleUrl: './ad-user.component.css'
})
export class AdUserComponent implements OnInit {
  user: IUser[] = [];
  userResponse: IUserResponse = {
    user: [],
    pagination: {
      total: 0,
      totalPages: 0,
      currentPage: 1,
      limit: 10
    }
  };
  currentPage: number = 1;
  selectedCategoryId: number | null = null;

  constructor(
    private userService: AdminUserService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    console.log('ngOnInit gọi nè'); // kiểm tra lifecycle hook có chạy không
    this.loadUsers();
  }
  
  loadUsers() {
    this.userService.getUser(this.currentPage).subscribe({
      next: (res) => {
        this.userResponse = res;
        this.user = this.userResponse.user;
      },
      error: (err) => {
        console.error('API lỗi:', err);
      }
    });
  }
  

  deleteUser(id: number) {
    Swal.fire({
      title: 'Bạn có chắc chắn muốn xóa người dùng này không?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Hủy',
    })
      .then((result) => {
        if (result.isConfirmed) {
          this.userService.deleteUser(id).subscribe({
            next: () => {
              this.user = this.user.filter(u => u.id !== id);
              this.toastr.success('Người dùng đã được xóa thành công');
            },
            error: (err: any) => {
              this.toastr.error(err.error?.message || 'Đã xảy ra lỗi khi xóa');
            }
          });
        }
      });
  }
}