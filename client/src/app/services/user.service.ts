import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IUser } from '../database/data';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new BehaviorSubject<IUser | null>(this.getUserFromLocalStorage());
  user$ = this.userSubject.asObservable();


  constructor() { }

  private getUserFromLocalStorage(): IUser | null {
    if (typeof sessionStorage !== 'undefined') {
      const userData = sessionStorage.getItem('user');
      return userData ? JSON.parse(userData) : null;
    } else {
      return null;
    }
  }

  getUser(): IUser | null {
    if (typeof sessionStorage !== 'undefined') {
      const userData = sessionStorage.getItem('user');
      return userData ? JSON.parse(userData) : null;
    } else {
      return null;
    }
  }

  setUser(user: IUser) {
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.setItem('user', JSON.stringify(user));
      this.userSubject.next(user);
    }
  }

  logout() {
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.removeItem('user');
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('expiresIn');
      this.userSubject.next(null);
    }
  }
}
