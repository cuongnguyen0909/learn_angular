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
  public message: string = '';
  constructor(private userService: UserService, private router: Router, private formService: FormService) {

  }
  ngOnInit(): void {
    this.loadData();
    this.formService.updateUserMessageSubject.subscribe(data => {
      this.messageFromUpdateUser = data;
    })
  }

  public loadData() {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
      console.log(data);
    })
  }

  public updateUser(userId: number) {
    this.router.navigate(['/user-update', userId])
    console.log(userId);
  }

  public deleteUser(userID: number) {
    this.userService.deleteStock(userID).subscribe((data) => {
      // console.log(data);
      this.loadData();
      const currentUser = this.users.find(user => user.id === userID);
      this.message = `Delet ${currentUser?.username} succesfully!`
      // console.log(currentUser);
      this.messageFromUpdateUser = '';
    })
  }
}
