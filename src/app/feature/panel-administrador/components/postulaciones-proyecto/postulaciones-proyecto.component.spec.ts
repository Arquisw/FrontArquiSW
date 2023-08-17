import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostulacionesProyectoComponent } from './postulaciones-proyecto.component';

describe('PostulacionesProyectoComponent', () => {
  let component: PostulacionesProyectoComponent;
  let fixture: ComponentFixture<PostulacionesProyectoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostulacionesProyectoComponent ]
    }).compileComponents();

    fixture = TestBed.createComponent(PostulacionesProyectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
