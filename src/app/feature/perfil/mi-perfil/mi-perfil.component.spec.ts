import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiPerfilComponent } from './mi-perfil.component';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '@core/services/http.service';
import { MiPerfilService } from '../service/mi-perfil.service';

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

describe('MiPerfilComponent', () => {
  let component: MiPerfilComponent;
  let fixture: ComponentFixture<MiPerfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({      
      imports: [HttpClientModule],
      providers: [
        HttpService,
        MiPerfilService,
        { provide: ActivatedRoute, useClass: ActivatedRouteStub }],
      declarations: [ MiPerfilComponent ]
    }).compileComponents();

    fixture = TestBed.createComponent(MiPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
