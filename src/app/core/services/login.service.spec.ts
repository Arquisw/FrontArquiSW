import { TestBed } from '@angular/core/testing';

import { GestionUsuarioService } from './login.service';

describe('LoginService', () => {
  let service: GestionUsuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionUsuarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
