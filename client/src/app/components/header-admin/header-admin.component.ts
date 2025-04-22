import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-admin',
  imports: [CommonModule],
  templateUrl: './header-admin.component.html',
  styleUrl: './header-admin.component.css'
})
export class HeaderAdminComponent {
  user = {
    name: '',
    email: ''
  }
  showDropdown = false;
  ready = false;

  constructor(private router: Router) { }

  ngOnInit() {
    if (!this.isLoggedIn()) {
      this.router.navigate(['/admin/admin-auth']);
    }
    if (typeof window !== 'undefined') {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      this.user.name = user.ho_ten || '';
      this.user.email = user.email || '';
    }
    this.ready = true;
  }

  getUserInfo() {
    if (typeof window !== 'undefined' && localStorage.getItem('user')) {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      return user.email || '';
    }
    return '';
  }

  getName() {
    if (typeof window !== 'undefined' && localStorage.getItem('user')) {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      return user.ho_ten || '';
    }
    return '';
  }


  isLoggedIn(): boolean {
    if (typeof window !== 'undefined') {
      return !!localStorage.getItem('user');
    }
    return false;
  }

  goToLogin() {
    if (typeof window !== 'undefined') {
      this.router.navigate(['/admin/admin-auth']);
    }
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('expires_in');
    this.router.navigate(['/admin/admin-auth']);
  }
}

