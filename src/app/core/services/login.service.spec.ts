import { TestBed } from '@angular/core/testing';
import { GestionUsuarioService } from './login.service';
import { HttpService } from './http.service';
import { HttpClientModule } from '@angular/common/http';

describe('LoginService', () => {
  let service: GestionUsuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [HttpService],
    });
    service = TestBed.inject(GestionUsuarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
