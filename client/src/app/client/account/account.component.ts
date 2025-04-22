import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';
import { UserService } from '../../services/user.service';
import { IUser } from '../../database/data';


@Component({
  selector: 'app-account',
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
  ],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent implements OnInit {
  activeMenuItem: string = 'profile';
  profileImage: string = '/assets/default-profile.png';
  user: IUser = {} as IUser;
  originalEmail: string = '';

  passwordForm: { currentPassword: string, newPassword: string, confirmPassword: string } = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  };


  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.loadUserFromSession();
  }

  loadUserFromSession() {
    if (typeof sessionStorage !== 'undefined') {
      const userJson = sessionStorage.getItem('user');
      const token = sessionStorage.getItem('token');

      if (!userJson || !token) {
        this.toastr.error('Vui lòng đăng nhập', 'Chưa xác thực');
        this.router.navigate(['/sign-in']);
        return;
      }

      try {
        const userData: IUser = JSON.parse(userJson);
        this.user = userData;
      } catch (error) {
        this.toastr.error('Lỗi đọc thông tin người dùng', 'Lỗi');
        this.router.navigate(['/sign-in']);
      }
    }
  }

  setActiveMenuItem(menuItem: string) {
    this.activeMenuItem = menuItem;
  }

  updateUserInfo() {
    const token = sessionStorage.getItem('token');
    const ho_ten = this.user.ho_ten;
    const email = this.user.email;
    const dien_thoai = this.user.dien_thoai;
    const dia_chi = this.user.dia_chi;
    if (!token) {
      this.toastr.error('Vui lòng đăng nhập', 'Chưa xác thực');
      return;
    }
    fetch(`http://localhost:3000/api/capnhat`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, ho_ten, dien_thoai, dia_chi })
    })
      .then(res => res.json())
      .then(data => {
        if (data.thong_bao && data.cap_nhat) {
          // this.user = data as IUser;
          Object.assign(this.user, data.cap_nhat);
          sessionStorage.setItem('user', JSON.stringify(this.user));
          this.toastr.success('Cập nhật thông tin thành công', 'Thành công');
        } else {
          this.toastr.error('Lỗi cập nhật thông tin', 'Lỗi');
        }
      })
      .catch(err => {
        this.toastr.error('Lỗi cập nhật thông tin', 'Lỗi');
      });
  }


  changePassword() {
    const token = sessionStorage.getItem('token');
    if (!token) {
      this.toastr.error('Vui lòng đăng nhập', 'Chưa xác thực');
      return;
    }

    const email = this.user.email;
    const pass_old = this.passwordForm.currentPassword;
    const pass_new1 = this.passwordForm.newPassword;
    const pass_new2 = this.passwordForm.confirmPassword;

    if (!pass_old || !pass_new1 || !pass_new2) {
      this.toastr.error('Vui lòng điền đầy đủ thông tin');
      return;
    }

    if (pass_new1 !== pass_new2) {
      this.toastr.error('Mật khẩu mới không khớp');
      return;
    }

    fetch(`http://localhost:3000/api/doipass`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        pass_old,
        pass_new1,
        pass_new2
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.thong_bao === 'Đổi mật khẩu thành công') {
          this.toastr.success(data.thong_bao, 'Thành công');
          this.passwordForm = { currentPassword: '', newPassword: '', confirmPassword: '' };
        } else {
          this.toastr.error(data.thong_bao || 'Lỗi đổi mật khẩu', 'Lỗi');
        }
      })
      .catch(err => {
        this.toastr.error('Lỗi hệ thống khi đổi mật khẩu', 'Lỗi');
      });
  }


  // private handleError(error: HttpErrorResponse) {
  //   let errorMessage = 'Đã có lỗi xảy ra!';
  //   if (error.error instanceof ErrorEvent) {
  //     errorMessage = `Lỗi: ${error.error.message}`;
  //   } else {
  //     errorMessage = `Mã lỗi: ${error.status}\nThông báo: ${error.message}`;
  //   }
  //   this.toastr.error(errorMessage, 'Lỗi');
  //   return throwError(() => new Error(errorMessage));
  // }

  logout() {
    this.userService.logout();
    this.router.navigate(['/sign-in']);
  }

  forgotPassword() {
    this.router.navigate(['/forgot-password']);
  }
}
