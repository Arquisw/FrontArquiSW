import { TestBed } from '@angular/core/testing';

import { ConfiguracionService } from './configuracion.service';
import { HttpService } from '@core/services/http.service';

describe('ConfiguracionService', () => {
  let service: ConfiguracionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpService],
    });
    service = TestBed.inject(ConfiguracionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
