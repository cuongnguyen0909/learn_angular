import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { FormService } from 'src/app/services/form.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  public users: User[] = [];
  public messageFromUpdateUser: string = '';
  constructor(private userService: UserService, private router: Router, private formService: FormService) {

  }
  ngOnInit(): void {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
    })

    this.formService.formMesageSubject.subscribe(data => {
      this.messageFromUpdateUser = data;
    })
  }
  public updateUser(userId: number) {
    this.router.navigate(['/user-update', userId])
    console.log(userId);
  }
}
