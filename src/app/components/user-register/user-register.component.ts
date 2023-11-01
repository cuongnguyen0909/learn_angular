import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { FormService } from 'src/app/services/form.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  public registerForm: FormGroup;
  constructor(private fb: FormBuilder, private userService: UserService
    , private router: Router, private formService: FormService) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }


  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  public onSubmit() {
    let newStock: Object = {};
    for (const control in this.registerForm.controls) {
      if (control) {
        newStock[control as keyof Object] = this.registerForm.controls[control].value;
      }
    }
    // Gửi dữ liệu lên server
    this.userService.addUser(newStock as User).subscribe(response => {
      this.router.navigate(['/login'])
      this.formService.sendMesage(`Create new User with username ${response.code} successfully`)
    });
  }
}

