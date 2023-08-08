import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarProyectoSeleccionadoComponent } from './consultar-proyecto-seleccionado.component';

describe('ConsultarMisProyectosComponent', () => {
  let component: ConsultarProyectoSeleccionadoComponent;
  let fixture: ComponentFixture<ConsultarProyectoSeleccionadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConsultarProyectoSeleccionadoComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ConsultarProyectoSeleccionadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
