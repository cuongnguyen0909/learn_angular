import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockUpdateFormComponent } from './stock-update-form.component';

describe('StockUpdateFormComponent', () => {
  let component: StockUpdateFormComponent;
  let fixture: ComponentFixture<StockUpdateFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StockUpdateFormComponent]
    });
    fixture = TestBed.createComponent(StockUpdateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
