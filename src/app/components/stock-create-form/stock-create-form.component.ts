import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Stock } from 'src/app/models/stock.model';
import { FormService } from 'src/app/services/form.service';
import { StockServerHttpService } from 'src/app/services/stock-server-http.service';

@Component({
  selector: 'app-stock-create-form',
  templateUrl: './stock-create-form.component.html',
  styleUrls: ['./stock-create-form.component.css']
})
export class StockCreateFormComponent implements OnInit {
  public message: string = '';
  public stockForm: FormGroup;
  public exchanges: string[] = [];

  constructor(private formBuilder: FormBuilder,
    private serverHttpService: StockServerHttpService,
    private router: Router,
    private formService: FormService) {
    this.stockForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      code: ['', [Validators.required, Validators.minLength(3)]],
      price: [null, [Validators.required, Validators.min(1)]],
      previousPrice: [null, [Validators.required, Validators.min(1)]],
      exchange: ['', [Validators.required]],
      favorite: false
    });
  }
  ngOnInit(): void {
    this.exchanges = ['NYSE', 'NASDAQ', 'NSE', 'HKEX', 'OTHER'];
  }

  public onSubmit() {
    let newStock: Object = {};
    for (const control in this.stockForm.controls) {
      if (control) {
        newStock[control as keyof Object] = this.stockForm.controls[control].value;
      }
    }
    // Gửi dữ liệu lên server
    this.serverHttpService.addStock(newStock as Stock).subscribe(response => {
      this.router.navigate(['/home'])
      this.formService.sendCreateStockMessage(`Create new Stock with code ${response.code} successfully`)
    });
  }
}
