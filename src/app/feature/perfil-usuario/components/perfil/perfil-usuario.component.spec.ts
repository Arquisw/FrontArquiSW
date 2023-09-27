import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilUsuarioComponent } from './perfil-usuario.component';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '@core/service/http.service';
import { PerfilUsuarioService } from '../../shared/service/perfil-usuario.service';

class ActivatedRouteStub {
  snapshot = {
    paramMap: {
      get: (param: string) => {
        if (param === 'id') {
          return '123';
        }
      }
    }
  };
}

describe('PerfilUsuarioComponent', () => {
  let component: PerfilUsuarioComponent;
  let fixture: ComponentFixture<PerfilUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        HttpService,
        PerfilUsuarioService,
        { provide: ActivatedRoute, useClass: ActivatedRouteStub }],
      declarations: [ PerfilUsuarioComponent ]
    }).compileComponents();

    fixture = TestBed.createComponent(PerfilUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
