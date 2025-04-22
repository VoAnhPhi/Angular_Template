// auth.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = sessionStorage.getItem('token');
  if (!token) { console.log("Không có token"); return router.navigate(['/sign-in']) }
  try {
    const decoded: any = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);
    if (decoded.exp < currentTime) {
      console.log("token quá hạn")
      localStorage.removeItem('token'); 
      return router.navigate(['/sign-in']);
    }
    else return true; 
  } catch (error) {
    console.log("Lỗi khi dò token")
    localStorage.removeItem('token');
    return router.navigate(['/sign-in']);
  }
};
