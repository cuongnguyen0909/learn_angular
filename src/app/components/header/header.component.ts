import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { FormService } from 'src/app/services/form.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  // @Input() isLoggedIn: boolean = false;
  public isLoggedIn: boolean = false;
  public user?: User;
  public isAdmin: boolean = false;
  constructor(private authService: AuthService,
    private router: Router,
    private formService: FormService) { }
  ngOnInit(): void {
    this.authService.loggedInSubject.subscribe(data => {
      this.isLoggedIn = data;
    })
    this.formService.dataSubject.subscribe(data => {
      this.user = data;
      // console.log(data);
    })
    this.authService.isAdminSubject.subscribe(data => {
      this.isAdmin = data;
    })
  }
  public logOut() {
    this.router.navigate(['/']);
  }
}
