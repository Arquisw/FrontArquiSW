import { TestBed } from '@angular/core/testing';

import { IngenieriaDeRequisitosService } from './ingenieria-de-requisitos.service';

describe('IngenieriaDeRequisitosService', () => {
  let service: IngenieriaDeRequisitosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IngenieriaDeRequisitosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
