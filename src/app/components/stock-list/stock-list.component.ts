import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Stock } from 'src/app/models/stock.model';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { FormService } from 'src/app/services/form.service';
import { StockServerHttpService } from 'src/app/services/stock-server-http.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css']
})
export class StockListComponent implements OnInit {
  // @Input() message = ''
  public stocks: Stock[] = [];
  public favoriteStocks: Stock[] = [];
  public messageFromLogin: string = '';
  // public messageFromUpdateStock: string = '';
  public messageFromDeleteStock: string = '';
  public isUpdated: boolean = false;
  public users: User[] = [];
  public isAdmin: boolean = false;


  constructor(private stockService: StockServerHttpService,
    private router: Router,
    private formService: FormService,
    private userService: UserService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.loadData();
    this.userService.getUsers().subscribe(data => {
      this.users = data;
    })
    this.formService.loginMessageSubject.subscribe(data => {
      this.messageFromLogin = data;
    })
    this.formService.updateUserMessageSubject.subscribe(data => {
      if (data) {
        // this.messageFromUpdateStock = data;
        this.messageFromLogin = '';
        this.messageFromDeleteStock = '';
      }
    })
    this.formService.deleteStockMessageSubject.subscribe(data => {
      if (data) {
        // this.messageFromUpdateStock = '';
        this.messageFromLogin = '';
        this.messageFromDeleteStock = data;
      }
    })
    this.formService.updateStockMessageSubject.subscribe(data => {
      this.isUpdated = data;
    })
    this.authService.isAdminSubject.subscribe(data => {
      this.isAdmin = data;
    })
  }

  //load data when CRUD
  public loadData() {
    this.stockService.getStocks().subscribe((data) => {
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
      this.stockService.updateFavorite(stockID, true).subscribe((data) => {
        // console.log('Favorite updated on the server', data);
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
      this.stockService.updateFavorite(stockID, false).subscribe((data) => {
        // console.log('Favorite updated on the server', data);
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
    this.stockService.deleteStock(stockID).subscribe((data) => {
      // console.log(data);
      const currentStock = this.stocks.find(stock => stock.id === stockID);
      this.formService.sendDeleteStockMessage(`Delete Stock '${currentStock?.name}' successfully`);
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
