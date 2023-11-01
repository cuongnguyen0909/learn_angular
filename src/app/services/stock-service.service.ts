import { Injectable } from '@angular/core';
import { ServerHttpService } from './server-http.service';
import { Stock } from '../models/stock.model';

@Injectable({
  providedIn: 'root'
})
export class StockServiceService {
  private stocks: Stock[] = []
  private favoriteStocks: Stock[] = [];
  constructor(private serverHttpService: ServerHttpService) { }

  // public getStocks() {
  //   this.serverHttpService.getStocks().subscribe(()=>{
  //     this.stocks.
  //   })
  // }
}
