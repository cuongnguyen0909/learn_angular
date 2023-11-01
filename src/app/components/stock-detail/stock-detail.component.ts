import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Stock } from 'src/app/models/stock.model';
import { ServerHttpService } from 'src/app/services/server-http.service';

@Component({
  selector: 'app-stock-detail',
  templateUrl: './stock-detail.component.html',
  styleUrls: ['./stock-detail.component.css']
})
export class StockDetailComponent implements OnInit {
  public stock: Stock | undefined;
  public id = 0;
  constructor(private serverHttpService: ServerHttpService,
    private router: Router,
    private activeRoute: ActivatedRoute) {

  }
  ngOnInit(): void {
    this.id = Number(this.activeRoute.snapshot.paramMap.get('id'));
    if (this.id > 0) {
      this.loadData(this.id);
    }
  }

  private loadData(stockID: number) {
    this.serverHttpService.getStock(stockID).subscribe((data) => {
      this.stock = data;
    })
  }

  public updateStock(stockID: number) {
    this.router.navigate(['/stock-update-form', stockID]);
  }

  public deleteStock(stockID: number) {
    this.serverHttpService.deleteStock(stockID).subscribe((data) => {
      this.router.navigate(['/']);
    })
  }

}
