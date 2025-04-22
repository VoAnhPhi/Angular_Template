import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  constructor(private userService: UserService, private router: Router) { }
  user = {
    email: '',
    mat_khau: ''
  }
  thong_bao: string = '';

  submitSignIn() {
    const signInBtn = document.querySelector('.login-container');
    if (signInBtn) {
      signInBtn.scrollIntoView({ behavior: 'smooth' });
    }

    if (this.user.email === '') {
      this.thong_bao = 'Email không được để trống';
      return;
    }
    if (this.user.mat_khau === '') {
      this.thong_bao = 'Mật khẩu không được để trống';
      return;
    }

    let opt = {
      method: 'POST',
      body: JSON.stringify(this.user),
      headers: {
        'Content-Type': 'application/json'
      }
    }
    fetch('http://localhost:3000/api/dangnhap', opt)
      .then(res => {
        if (res.status === 200) {
          return res.json();
        } else {
          return res.json().then(data => {
            throw new Error(data.thong_bao || 'Đăng nhập thất bại');
          });
        }
      })
      .then(data => {
        this.thong_bao = 'Đăng nhập thành công';
        const { user, token, expiresIn } = data;
        if (user) {
          this.userService.setUser(user);
          sessionStorage.setItem('user', JSON.stringify(user));
          sessionStorage.setItem('token', token);
          sessionStorage.setItem('expiresIn', expiresIn);
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 1000);
        }
      })
      .catch(err => {
        this.thong_bao = err.message || 'Đăng nhập thất bại';
        console.error('Lỗi đăng nhập:', err);
      });
  }
}
