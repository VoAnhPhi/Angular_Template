import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Toast } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-auth',
  imports: [FormsModule],
  templateUrl: './admin-auth.component.html',
  styleUrl: './admin-auth.component.css'
})
export class AdminAuthComponent {
  constructor(private router: Router, private toastr: ToastrService, private http: HttpClient) { }
  ApiUrl = "http://localhost:3000";
  user = {
    email: '',
    mat_khau: ''
  }
  message = '';

  login() {
    console.log(this.user);
    if (this.user.email === "") {
      this.message = "Vui lòng nhập email";
      this.toastr.warning(this.message);
      return;
    }

    if (this.user.mat_khau === "") {
      this.message = "Vui lòng nhập mật khẩu";
      this.toastr.warning(this.message);
      return;
    }

    this.http.post(`${this.ApiUrl}/admin/dangnhap`, this.user).subscribe((res: any) => {
      console.log(res);
      if (res.status === 200) {
        this.toastr.success("Đăng nhập thành công");
        localStorage.setItem("token", res.token);
        localStorage.setItem("user", JSON.stringify(res.user));
        this.router.navigate(['/admin']);
      }
    }, (error: any) => {
      this.message = error?.error?.message || "Đăng nhập thất bại";
      this.toastr.error(this.message);
    });
  }
}