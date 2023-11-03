import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  public updateStockMessageSubject = new BehaviorSubject<boolean>(false);
  public createStockMessageSubject = new BehaviorSubject<any>(null);
  public deleteStockMessageSubject = new BehaviorSubject<any>(null);
  public updateUserMessageSubject = new BehaviorSubject<any>(null);
  public loginMessageSubject = new BehaviorSubject<any>(null);
  public registerUserMessageSubject = new BehaviorSubject<any>(null);
  public deleteUserMesaageSubject = new BehaviorSubject<any>(null);
  public dataSubject = new BehaviorSubject<User>({
    id: 0, // provide an appropriate id value
    username: '', // provide an appropriate username value
    password: '', // provide an appropriate password value
    email: '',
    favoriteStocks: [],
  });
  constructor() { }

  public sendUpdateUserMesage(message: string) {
    this.updateUserMessageSubject.next(message);
  }
  public sendLoginMesage(message: string) {
    this.loginMessageSubject.next(message);
  }
  public sendRegisterUserMesage(message: string) {
    this.registerUserMessageSubject.next(message);
  }
  public sendDeleteUserMesage(message: string) {
    this.deleteUserMesaageSubject.next(message);
  }
  public sendCreateStockMessage(message: string) {
    this.createStockMessageSubject.next(message);
  }
  public sendDeleteStockMessage(message: string) {
    this.deleteStockMessageSubject.next(message)
      ;
  }
  public sendUpdateStock(isUpdated: boolean) {
    this.updateStockMessageSubject.next(isUpdated);
  }
  public sendData(user: User) {
    this.dataSubject.next(user);
  }




}
