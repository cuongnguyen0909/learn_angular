import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { FormService } from 'src/app/services/form.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {
  public id: number = 0;
  public userUpdateForm: FormGroup;
  public message: string = '';
  public users: User[] = [];

  constructor(private userService: UserService, private activeRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private formService: FormService,
    private router: Router) {
    this.userUpdateForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.minLength(6)]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      role: [null, [Validators.required]],
    });
  }
  ngOnInit(): void {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
    })
    this.id = Number(this.activeRoute.snapshot.paramMap.get('id'));
    if (this.id > 0) {
      //load data
      this.loadData(this.id);
    }
  }
  private loadData(userID: number) {
    this.userService.getUser(userID).subscribe((data) => {
      console.log(data);
      for (const controlName in this.userUpdateForm.controls) {
        if (controlName) {
          this.userUpdateForm.controls[controlName].setValue(data[controlName]);
        }
      }
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
    for (const control in this.userUpdateForm.controls) {
      if (control) {
        newUser[control as keyof Object] = this.userUpdateForm.controls[control].value;
      }
    }
    for (const control in this.userUpdateForm.controls) {
      if (control) {
        newUser[control as keyof Object] = this.userUpdateForm.controls[control].value;
      }
    }
    // Create a clone of the users array and remove the current user from the cloned array
    const clonedUsers = this.users.filter(user => user.id !== this.id);

    // Check if username or email already exists in the cloned array
    const usernameExists = clonedUsers.some(user => user.username === newUser.username);
    const emailExists = clonedUsers.some(user => user.email === newUser.email);

    if (usernameExists) {
      this.message = 'Username already exists';
      return;
    }
    if (emailExists) {
      this.message = 'Email already exists';
      return;
    }

    // Gửi dữ liệu lên server
    this.userService.updateUser(this.id, newUser as User).subscribe(data => {
      this.message = `Update ${data.username} suceessuly`;
      this.router.navigate(['/user-list']);
      this.formService.sendMesage(this.message);
    })
    //   // , (err) => {
    //   // }
    // )
  }
}
