import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsociacionConfiguracionComponent } from './asociacion-configuracion.component';
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

describe('AsociacionConfiguracionComponent', () => {
  let component: AsociacionConfiguracionComponent;
  let fixture: ComponentFixture<AsociacionConfiguracionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        HttpService,
        ConfiguracionService,
        { provide: ActivatedRoute, useClass: ActivatedRouteStub }],
      declarations: [ AsociacionConfiguracionComponent ]
    }).compileComponents();

    fixture = TestBed.createComponent(AsociacionConfiguracionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
