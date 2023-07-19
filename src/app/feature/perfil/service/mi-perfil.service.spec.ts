import { TestBed } from '@angular/core/testing';

import { MiPerfilService } from './mi-perfil.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpService } from '@core/services/http.service';

describe('MiPerfilService', () => {
  let service: MiPerfilService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MiPerfilService, HttpService],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(MiPerfilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
