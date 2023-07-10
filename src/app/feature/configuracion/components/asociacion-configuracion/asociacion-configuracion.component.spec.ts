import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsociacionConfiguracionComponent } from './asociacion-configuracion.component';

describe('AsociacionConfiguracionComponent', () => {
  let component: AsociacionConfiguracionComponent;
  let fixture: ComponentFixture<AsociacionConfiguracionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsociacionConfiguracionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsociacionConfiguracionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
