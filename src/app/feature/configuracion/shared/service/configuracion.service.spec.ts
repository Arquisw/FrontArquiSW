import { TestBed } from '@angular/core/testing';

import { ConfiguracionService } from './configuracion.service';
import { HttpService } from '@core/services/http.service';
import { HttpClientModule } from '@angular/common/http';


describe('ConfiguracionService', () => {
  let service: ConfiguracionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        HttpService,
        ConfiguracionService],
    });
    service = TestBed.inject(ConfiguracionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
