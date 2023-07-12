import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiAsociacionComponent } from './mi-asociacion.component';
import { HttpService } from '@core/services/http.service';
import { HttpClientModule } from '@angular/common/http';
import { MiAsociacionService } from '../service/mi-asociacion.service';
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

describe('MiAsociacionComponent', () => {
  let component: MiAsociacionComponent;
  let fixture: ComponentFixture<MiAsociacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        HttpService,
        MiAsociacionService,
        { provide: ActivatedRoute, useClass: ActivatedRouteStub }],
      declarations: [ MiAsociacionComponent ]
    }).compileComponents();

    fixture = TestBed.createComponent(MiAsociacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
