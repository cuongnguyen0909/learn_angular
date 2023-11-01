import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Stock } from 'src/app/models/stock.model';
import { FormServiceService } from 'src/app/services/form-service.service';
import { ServerHttpService } from 'src/app/services/server-http.service';

@Component({
  selector: 'app-stock-update-form',
  templateUrl: './stock-update-form.component.html',
  styleUrls: ['./stock-update-form.component.css']
})
export class StockUpdateFormComponent implements OnInit {
  public id = 0;
  public message: string = '';
  public stockForm: FormGroup;
  public exchanges: string[] = ['NYSE', 'NASDAQ', 'NSE', 'HKEX', 'OTHER'];

  constructor(private formBuilder: FormBuilder,
    private serverHttpService: ServerHttpService,
    private router: Router,
    private activeRoute: ActivatedRoute) {
    this.stockForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(6)]],
      code: ['', [Validators.required, Validators.minLength(3)]],
      price: [null, [Validators.required, Validators.min(1)]],
      previousPrice: [null, [Validators.required, Validators.min(1)]],
      exchange: ['', [Validators.required]],
      favorite: false,
    });
  }

  ngOnInit(): void {
    this.id = Number(this.activeRoute.snapshot.paramMap.get('id'));

    if (this.id > 0) {
      //load data
      this.loadData(this.id);
    }
  }

  //Load dato to form
  private loadData(stockID: number) {
    this.serverHttpService.getStock(stockID).subscribe((data) => {
      console.log(data);
      for (const controlName in this.stockForm.controls) {
        if (controlName) {
          this.stockForm.controls[controlName].setValue(data[controlName]);
        }
      }

    })
  }

  //submit data to server
  public onSubmit() {
    let newStock: Object = {};
    for (const control in this.stockForm.controls) {
      if (control) {
        newStock[control as keyof Object] = this.stockForm.controls[control].value;
      }
    }
    // Gửi dữ liệu lên server
    this.serverHttpService.updateStock(this.id, newStock as Stock).subscribe(response => {
      // this.router.navigate(['/']);
      this.message = `Update stock ${response.name} suceessuly`;
    }
      // , (err) => {
      // }
    )
  }

  public backToHome() {
    this.router.navigate(['/home']);
  }
}





