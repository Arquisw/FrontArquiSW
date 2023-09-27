import { TestBed } from '@angular/core/testing';

import { AsociacionService } from './asociacion.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpService } from './http.service';

describe('AsociacionService', () => {
  let service: AsociacionService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AsociacionService, HttpService],
    });
    service = TestBed.inject(AsociacionService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
