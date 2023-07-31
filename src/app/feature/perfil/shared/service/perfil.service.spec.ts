import { TestBed } from '@angular/core/testing';

import { PerfilService } from './perfil.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpService } from '@core/services/http.service';

describe('PerfilService', () => {
  let service: PerfilService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PerfilService, HttpService],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(PerfilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
