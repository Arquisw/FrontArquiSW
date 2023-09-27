import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilAsociacionComponent } from './perfil-asociacion.component';
import { HttpService } from '@core/service/http.service';
import { HttpClientModule } from '@angular/common/http';
import { PerfilAsociacionService } from '../../shared/service/perfil-asociacion.service';
import { ActivatedRoute } from '@angular/router';


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

describe('AsociacionComponent', () => {
  let component: PerfilAsociacionComponent;
  let fixture: ComponentFixture<PerfilAsociacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        HttpService,
        PerfilAsociacionService,
        { provide: ActivatedRoute, useClass: ActivatedRouteStub }],
      declarations: [ PerfilAsociacionComponent ]
    }).compileComponents();

    fixture = TestBed.createComponent(PerfilAsociacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
