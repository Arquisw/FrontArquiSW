import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarProyectosSeleccionadoComponent } from './consultar-proyectos-seleccionado.component';

describe('ConsultarMisProyectosComponent', () => {
  let component: ConsultarProyectosSeleccionadoComponent;
  let fixture: ComponentFixture<ConsultarProyectosSeleccionadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConsultarProyectosSeleccionadoComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ConsultarProyectosSeleccionadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
