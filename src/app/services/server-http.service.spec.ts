import { TestBed } from '@angular/core/testing';

import { StockServerHttpService } from './stock-server-http.service';

describe('ServerHttpService', () => {
  let service: StockServerHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockServerHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
