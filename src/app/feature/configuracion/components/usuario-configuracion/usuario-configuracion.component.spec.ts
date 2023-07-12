import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioConfiguracionComponent } from './usuario-configuracion.component';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '@core/services/http.service';
import { ConfiguracionService } from '../../shared/service/configuracion.service';

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

describe('UsuarioConfiguracionComponent', () => {
  let component: UsuarioConfiguracionComponent;
  let fixture: ComponentFixture<UsuarioConfiguracionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        HttpService,
        ConfiguracionService,
        { provide: ActivatedRoute, useClass: ActivatedRouteStub }],
      declarations: [ UsuarioConfiguracionComponent ]
    }).compileComponents();

    fixture = TestBed.createComponent(UsuarioConfiguracionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
