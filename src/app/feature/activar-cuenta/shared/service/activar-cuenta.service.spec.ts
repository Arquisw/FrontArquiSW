import { TestBed } from '@angular/core/testing';

import { ActivarCuentaService } from './activar-cuenta.service';

describe('ActivarCuentaService', () => {
  let service: ActivarCuentaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActivarCuentaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
