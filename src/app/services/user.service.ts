import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private REST_API_SERVER = 'http://localhost:3000'
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };;

  constructor(private httpClient: HttpClient) { }

  public getUsers(): Observable<any> {
    const url = `${this.REST_API_SERVER}/users`;
    return this.httpClient.get<any>(url, this.httpOptions);
  }

  public addUser(user: User): Observable<any> {
    const url = `${this.REST_API_SERVER}/users`;
    return this.httpClient.post<any>(url, user, this.httpOptions);
  }

}
