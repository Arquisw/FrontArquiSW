import { TestBed } from '@angular/core/testing';

import { ProyectoEspecificoService } from './proyecto-especifico.service';

describe('ProyectoEspecificoService', () => {
  let service: ProyectoEspecificoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProyectoEspecificoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
