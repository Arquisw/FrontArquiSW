import { TestBed } from '@angular/core/testing';

import { PerfilUsuarioService } from './perfil-usuario.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpService } from '@core/service/http.service';

describe('PerfilUsuarioService', () => {
  let service: PerfilUsuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PerfilUsuarioService, HttpService],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(PerfilUsuarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
