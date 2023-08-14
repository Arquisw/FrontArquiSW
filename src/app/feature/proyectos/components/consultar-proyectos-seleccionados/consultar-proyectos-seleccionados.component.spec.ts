import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarProyectosSeleccionadosComponent } from './consultar-proyectos-seleccionados.component';

describe('ConsultarProyectosSeleccionadosComponent', () => {
  let component: ConsultarProyectosSeleccionadosComponent;
  let fixture: ComponentFixture<ConsultarProyectosSeleccionadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConsultarProyectosSeleccionadosComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ConsultarProyectosSeleccionadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
