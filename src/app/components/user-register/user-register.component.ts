import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Stock } from 'src/app/models/stock.model';
import { User } from 'src/app/models/user';
import { FormService } from 'src/app/services/form.service';
import { StockServerHttpService } from 'src/app/services/stock-server-http.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  public message: String = '';
  public users: User[] = [];
  public registerForm: FormGroup;
  @ViewChild('usernameInput') usernameInput!: ElementRef;
  constructor(private fb: FormBuilder,
    private userService: UserService
    , private router: Router, private formService: FormService) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
      // console.log(this.users);
    })
  }

  public onSubmit() {
    let newUser: User = {
      id: 0,
      username: '',
      password: '',
      email: '',
      role: 'user'
    };
    for (const control in this.registerForm.controls) {
      if (control) {
        newUser[control as keyof Object] = this.registerForm.controls[control].value;
      }
    }
    // Check if username or email already exists
    const usernameExists = this.users.some(user => user.username === newUser['username']);
    const emailExists = this.users.some(user => user.email === newUser['email']);

    if (usernameExists) {
      this.message = 'Username already exists';
      this.registerForm.reset();
      this.setFocusToUsername();
      return;
    }
    if (emailExists) {
      this.message = 'Email already exists';
      this.registerForm.reset();
      this.setFocusToUsername();
      return;
    }
    this.userService.addUser({ ...newUser as User, role: "user" }).subscribe(data => {
      this.router.navigate(['/login'])
      this.formService.sendMesage(`Create ${data.username} successfully`)
    })

  }
  private setFocusToUsername(): void {
    if (this.usernameInput) {
      this.usernameInput.nativeElement.focus();
    }
  }
}
