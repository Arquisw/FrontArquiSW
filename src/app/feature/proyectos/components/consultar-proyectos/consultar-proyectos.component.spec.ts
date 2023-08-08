import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarProyectosComponent } from './consultar-proyectos.component';

describe('ConsultarProyectosComponent', () => {
  let component: ConsultarProyectosComponent;
  let fixture: ComponentFixture<ConsultarProyectosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultarProyectosComponent ]
    }).compileComponents();

    fixture = TestBed.createComponent(ConsultarProyectosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
