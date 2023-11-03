import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public loggedInSubject = new BehaviorSubject<boolean>(false);
  public isAdminSubject = new BehaviorSubject<boolean>(false);
  constructor() { }

  public sendStatusLoggedIn(isLoggedIn: boolean) {
    this.loggedInSubject.next(isLoggedIn);
  }

  public sendIsAdmin(isAdmin: boolean) {
    this.isAdminSubject.next(isAdmin);
  }
}
