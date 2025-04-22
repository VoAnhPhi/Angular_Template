
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-sign-up',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})

export class SignUpComponent {
  user = {
    ho_ten: '',
    email: '',
    dien_thoai: '',
    mat_khau: '',
    nhap_lai_mat_khau: '',
  }
  
  thong_bao: string = '';
  submitSignUp(form: NgForm) {
    const signupBtn = document.querySelector('.signup-container');
    if (signupBtn) {
      signupBtn.scrollIntoView({ behavior: 'smooth' });
    }

    if (this.user.ho_ten === '') {
      this.thong_bao = 'Họ tên không được để trống';
      return;
    }
    if (this.user.email === '') {
      this.thong_bao = 'Email không được để trống';
      return;
    }
    if (this.user.dien_thoai === '') {
      this.thong_bao = 'Số điện thoại không được để trống';
      return;
    }
    if (this.user.mat_khau !== this.user.nhap_lai_mat_khau) {
      this.thong_bao = 'Mật khẩu không khớp';
      return;
    }
    if (this.user.mat_khau.length < 6) {
      this.thong_bao = 'Mật khẩu phải có ít nhất 6 ký tự';
      return;
    }
    let opt = {
      method: 'POST', body: JSON.stringify(this.user), headers: {
        'Content-Type': 'application/json'
      }
    }
    fetch('http://localhost:3000/api/dangky', opt)
      .then(res => res.json())
      .then(data => {
        if (data.status === 200) {
          this.thong_bao = 'Đăng ký thành công';
        } else {
          this.thong_bao = data.thong_bao;
        }
      })
      .catch(err => {
        this.thong_bao = err.thong_bao;
      });
    console.log(this.user);
    this.thong_bao = 'Đăng ký thành công';
  }
}
