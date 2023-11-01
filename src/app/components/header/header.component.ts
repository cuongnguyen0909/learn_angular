import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  // @Input() isLoggedIn: boolean = false;
  public isLoggedIn: boolean = false;
  constructor(private authService: AuthService, private router: Router) { }
  ngOnInit(): void {
    this.authService.loggedInSubject.subscribe(data => {
      this.isLoggedIn = data;
    })
  }
  public logOut() {
    this.router.navigate(['/']);
  }
}
