import { Component, Input, OnInit } from '@angular/core';
import { Stock } from 'src/app/models/stock.model';
import { ServerHttpService } from 'src/app/services/server-http.service';

@Component({
  selector: 'app-stock-favorite-list',
  templateUrl: './stock-favorite-list.component.html',
  styleUrls: ['./stock-favorite-list.component.css']
})
export class StockFavoriteListComponent implements OnInit {
  public favoriteStocks: Stock[] = [];

  constructor(private serverHttpStockService: ServerHttpService) { }
  ngOnInit(): void {
    this.loadData();
  }

  public loadData() {
    this.serverHttpStockService.getFavoriteStocks().subscribe((data) => {
      this.favoriteStocks = data;
    });
  }

  public toggleRemove(stockID: number) {
    const stock = this.favoriteStocks.find((item) => item.id === stockID);
    if (stock) {
      const updatedStock = { ...stock, favorite: false };
      this.serverHttpStockService.updateFavorite(stockID, false).subscribe((data) => {
        // console.log('Favorite updated on the server', data);
        // Update the local stocks array with the updated stock
        const index = this.favoriteStocks.findIndex((item) => item.id === stockID);
        if (index !== -1) {
          this.favoriteStocks[index] = updatedStock;
        }
      });
    }
    this.loadData();

  }
}
