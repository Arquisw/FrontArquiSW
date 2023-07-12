import { TestBed } from '@angular/core/testing';

import { MiAsociacionService } from './mi-asociacion.service';

describe('MiAsociacionService', () => {
  let service: MiAsociacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MiAsociacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
