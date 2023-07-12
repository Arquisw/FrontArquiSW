import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiAsociacionComponent } from './mi-asociacion.component';
import { HttpService } from '@core/services/http.service';

describe('MiAsociacionComponent', () => {
  let component: MiAsociacionComponent;
  let fixture: ComponentFixture<MiAsociacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [HttpService],
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
