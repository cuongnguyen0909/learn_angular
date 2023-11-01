import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockFavoriteListComponent } from './stock-favorite-list.component';

describe('StockFavoriteListComponent', () => {
  let component: StockFavoriteListComponent;
  let fixture: ComponentFixture<StockFavoriteListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StockFavoriteListComponent]
    });
    fixture = TestBed.createComponent(StockFavoriteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
