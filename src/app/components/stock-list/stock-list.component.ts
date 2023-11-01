import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Stock } from 'src/app/models/stock.model';
import { FormService } from 'src/app/services/form.service';
import { StockServerHttpService } from 'src/app/services/stock-server-http.service';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css']
})
export class StockListComponent implements OnInit {
  // @Input() message = ''
  public stocks: Stock[] = [];
  public favoriteStocks: Stock[] = [];
  public message: string = '';

  constructor(private serverHttpService: StockServerHttpService,
    private router: Router,
    private formService: FormService) { }

  ngOnInit(): void {
    this.loadData();
    this.formService.formMesageSubject.subscribe(data => {
      this.message = data;
    })
  }

  //load data when CRUD
  public loadData() {
    this.serverHttpService.getStocks().subscribe((data) => {
      console.log(this.stocks);
      this.stocks = data;
      this.updateFavoriteStocks();
    })
  }

  //
  public toggleFavorite(stockID: number) {
    const stock = this.stocks.find((item) => item.id === stockID);
    if (stock) {
      //clone stock at index existed
      const updatedStock = { ...stock, favorite: true };
      //call medthod update from service
      this.serverHttpService.updateFavorite(stockID, true).subscribe((data) => {
        console.log('Favorite updated on the server', data);
        // Update the local stocks array with the updated stock
        const index = this.stocks.findIndex((item) => item.id === stockID);
        if (index !== -1) {
          this.stocks[index] = updatedStock;
        }
      });
    }
  }

  //
  public toggleUnFavorite(stockID: number) {
    const stock = this.stocks.find((item) => item.id === stockID);
    if (stock) {
      const updatedStock = { ...stock, favorite: false };
      this.serverHttpService.updateFavorite(stockID, false).subscribe((data) => {
        console.log('Favorite updated on the server', data);
        // Update the local stocks array with the updated stock
        const index = this.stocks.findIndex((item) => item.id === stockID);
        if (index !== -1) {
          this.stocks[index] = updatedStock;
        }
      });
    }
  }

  //delete stock
  public deleteStock(stockID: number) {
    this.serverHttpService.deleteStock(stockID).subscribe((data) => {
      console.log(data);
      this.loadData();
    })
  }

  //navigate when click add button
  public addStock() {
    this.router.navigate(['/stock-create-form']);
  }

  //navigate when click update button
  public updateStock(stockID: number) {
    this.router.navigate(['/stock-update-form', stockID]);
  }

  //update stock 'favorite' attribute, loading page and loading stock list
  private updateFavoriteStocks(): void {
    this.favoriteStocks = this.stocks.filter((stock) => stock.favorite);
  }

  public stockDetail(stockID: number) {
    this.router.navigate(['/stock-detail', stockID])
  }
}
