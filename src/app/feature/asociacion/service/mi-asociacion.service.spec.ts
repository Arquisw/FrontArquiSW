import { TestBed } from '@angular/core/testing';

import { MiAsociacionService } from './mi-asociacion.service';
import { HttpService } from '@core/services/http.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('MiAsociacionService', () => {
  let service: MiAsociacionService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MiAsociacionService, HttpService],
   
    });
    service = TestBed.inject(MiAsociacionService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
