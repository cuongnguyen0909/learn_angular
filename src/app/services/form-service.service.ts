import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormServiceService {
  public formMesageSubject = new BehaviorSubject<any>(null);
  constructor() { }

  public sendMesage(message: string) {
    this.formMesageSubject.next(message);
  }
}
