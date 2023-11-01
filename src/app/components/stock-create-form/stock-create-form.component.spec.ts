import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockCreateFormComponent } from './stock-create-form.component';

describe('StockCreateFormComponent', () => {
  let component: StockCreateFormComponent;
  let fixture: ComponentFixture<StockCreateFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StockCreateFormComponent]
    });
    fixture = TestBed.createComponent(StockCreateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
