import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarMisProyectosComponent } from './consultar-mis-proyectos.component';

describe('ConsultarMisProyectosAsociacionComponent', () => {
  let component: ConsultarMisProyectosComponent;
  let fixture: ComponentFixture<ConsultarMisProyectosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConsultarMisProyectosComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ConsultarMisProyectosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
