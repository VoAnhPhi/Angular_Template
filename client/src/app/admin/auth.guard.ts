import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';

export const AuthGuard: CanActivateFn = (route, state) => {
  if (typeof window === 'undefined') return false;

  const router = inject(Router);
  const toastr = inject(ToastrService);
  
  const token: string | null = localStorage.getItem('token');
  if (!token) {
    toastr.error('Bạn cần đăng nhập để truy cập trang này');
    router.navigate(['/admin/admin-auth']);
    return false;
  } 

  try {
    const decodedToken:any = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decodedToken.exp < currentTime) {
      localStorage.removeItem('token');
      toastr.error('Token đã hết hạn, vui lòng đăng nhập lại');
      router.navigate(['/admin/admin-auth']);
      return false;
    }
  } catch (error) {
    localStorage.removeItem('token');
    toastr.error('Token không hợp lệ, vui lòng đăng nhập lại');
    router.navigate(['/admin/admin-auth']);
    return false;
  }
  return true;
}
