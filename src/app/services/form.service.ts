import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  public formMesageSubject = new BehaviorSubject<any>(null);
  public dataSubject = new BehaviorSubject<User>({
    id: 0, // provide an appropriate id value
    username: '', // provide an appropriate username value
    password: '', // provide an appropriate password value
    email: ''
  });
  constructor() { }

  public sendMesage(message: string) {
    this.formMesageSubject.next(message);
  }

  public sendData(user: User) {
    this.dataSubject.next(user);
  }


}
