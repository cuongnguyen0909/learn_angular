import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { FormService } from 'src/app/services/form.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  public users: User[] = [];
  public loginForm: FormGroup;
  public isLoggedIn: boolean = false;
  public isAdmin: boolean = false;
  public message: string = '';
  public messageFormRegister: string = '';
  @ViewChild('usernameInput') usernameInput!: ElementRef;
  // @Output() loggedInStatus: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private formService: FormService) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }
  ngOnInit(): void {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
    this.formService.formMesageSubject.subscribe(data => {
      this.messageFormRegister = data;
    })
  }

  public login(username: string, password: string) {
    // Thực hiện kiểm tra username và password với dữ liệu từ server
    for (let user of this.users) {
      if ((user.username === username && user.password === password) || (user.email === username && user.password === password)) {
        this.isLoggedIn = true;
        //send status is log in to header component
        this.authService.sendStatusLoggedIn(this.isLoggedIn);
        this.formService.sendData(user);
        if (user.role === "admin") {
          this.isAdmin = true;
          this.authService.sendIsAdmin(this.isAdmin);
          console.log(this.isAdmin);
        }
        break;
      }
    }

    // Nếu đăng nhập thành công, chuyển hướng sang trang home
    if (this.isLoggedIn) {
      this.router.navigate(['/home']);
    } else {
      // Xử lý khi đăng nhập không thành công, ví dụ hiển thị thông báo lỗi
      this.loginForm.controls['username'].setValue('');
      this.loginForm.controls['password'].setValue('');
      this.message = "Username or Password incorrect"
      console.log("Đăng nhập không thành công. Vui lòng kiểm tra lại thông tin đăng nhập.");
      this.setFocusToUsername();
    }
    // Phát ra sự kiện về trạng thái đăng nhập
    // this.loggedInStatus.emit(this.isLoggedIn);
  }

  public registerUser() {
    this.router.navigate(['/register']);
  }

  private setFocusToUsername(): void {
    if (this.usernameInput) {
      this.usernameInput.nativeElement.focus();
    }
  }
}


