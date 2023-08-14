import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarProyectosPostuladosComponent } from './consultar-proyectos-postulados.component';

describe('ConsultarProyectosPostuladosComponent', () => {
  let component: ConsultarProyectosPostuladosComponent;
  let fixture: ComponentFixture<ConsultarProyectosPostuladosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConsultarProyectosPostuladosComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ConsultarProyectosPostuladosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
