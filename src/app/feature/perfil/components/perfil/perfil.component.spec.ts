import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilComponent } from './perfil.component';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '@core/service/http.service';
import { PerfilService } from '../../shared/service/perfil.service';

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

describe('PerfilComponent', () => {
  let component: PerfilComponent;
  let fixture: ComponentFixture<PerfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        HttpService,
        PerfilService,
        { provide: ActivatedRoute, useClass: ActivatedRouteStub }],
      declarations: [ PerfilComponent ]
    }).compileComponents();

    fixture = TestBed.createComponent(PerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
