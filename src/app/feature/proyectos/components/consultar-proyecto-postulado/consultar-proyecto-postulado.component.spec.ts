import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarProyectoPostuladoComponent } from './consultar-proyecto-postulado.component';

describe('ConsultarProyectoPostuladosComponent', () => {
  let component: ConsultarProyectoPostuladoComponent;
  let fixture: ComponentFixture<ConsultarProyectoPostuladoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConsultarProyectoPostuladoComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ConsultarProyectoPostuladoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
