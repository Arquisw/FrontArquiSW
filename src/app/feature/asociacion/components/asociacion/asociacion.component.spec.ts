import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsociacionComponent } from './asociacion.component';
import { HttpService } from '@core/services/http.service';
import { HttpClientModule } from '@angular/common/http';
import { AsociacionService } from '../../shared/service/asociacion.service';
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
  let component: AsociacionComponent;
  let fixture: ComponentFixture<AsociacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        HttpService,
        AsociacionService,
        { provide: ActivatedRoute, useClass: ActivatedRouteStub }],
      declarations: [ AsociacionComponent ]
    }).compileComponents();

    fixture = TestBed.createComponent(AsociacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
