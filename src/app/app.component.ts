import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(private router: Router, private authService: AuthService) {
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    this.authService.loggedInSubject.subscribe(data => {
      this.isLoggedIn = data;
    })
  }



}
