import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarProyectosPostuladoComponent } from './consultar-proyectos-postulado.component';

describe('ConsultarProyectosPostuladosComponent', () => {
  let component: ConsultarProyectosPostuladoComponent;
  let fixture: ComponentFixture<ConsultarProyectosPostuladoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConsultarProyectosPostuladoComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ConsultarProyectosPostuladoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
