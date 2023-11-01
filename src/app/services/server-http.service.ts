import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Stock } from '../models/stock.model';

@Injectable({
  providedIn: 'root'
})
export class ServerHttpService {
  private REST_API_SERVER = 'http://localhost:3000'
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  private favoriteStocks: Stock[] = [];
  constructor(private httpClient: HttpClient) { }

  //GET ALL STOCK
  public getStocks(): Observable<any> {
    const url = `${this.REST_API_SERVER}/stocks`;
    return this.httpClient.get<any>(url, this.httpOptions);
  }

  //GET A STOCK
  public getStock(stockID: number): Observable<any> {
    const url = `${this.REST_API_SERVER}/stocks/${stockID}`;
    return this.httpClient.get<any>(url, this.httpOptions);
  }

  public addStock(stock: Stock): Observable<any> {
    const url = `${this.REST_API_SERVER}/stocks`;
    return this.httpClient.post<any>(url, stock, this.httpOptions);
  }

  public updateFavorite(stockID: number, favorite: boolean): Observable<any> {
    const url = `${this.REST_API_SERVER}/stocks/${stockID}`;
    // const updatedStock = { favorite: favorite };
    return this.httpClient.patch<any>(url, { favorite: favorite }, this.httpOptions);
  }

  public updateUnFavorite(stockID: number, favorite: boolean): Observable<any> {
    const url = `${this.REST_API_SERVER}/stocks/${stockID}`;
    // const updatedStock = { favorite: favorite };
    return this.httpClient.patch<any>(url, { favorite: favorite }, this.httpOptions);
  }

  public getFavoriteStocks(): Observable<any> {
    const url = `${this.REST_API_SERVER}/stocks?favorite=true`; // assuming the server filters favorites using the query parameter
    return this.httpClient.get<any>(url, this.httpOptions);
  }

  public deleteStock(stockID: number) {
    const url = `${this.REST_API_SERVER}/stocks/${stockID}`;
    return this.httpClient.delete<any>(url);
  }

  //update Stock existed
  public updateStock(stockID: number, stock: Stock): Observable<any> {
    const url = `${this.REST_API_SERVER}/stocks/${stockID}`;
    return this.httpClient.put(url, stock, this.httpOptions);
  }
}
