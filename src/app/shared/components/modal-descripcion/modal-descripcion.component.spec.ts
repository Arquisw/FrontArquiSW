import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDescripcionComponent } from './modal-descripcion.component';

describe('ModalDescripcionComponent', () => {
  let component: ModalDescripcionComponent;
  let fixture: ComponentFixture<ModalDescripcionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalDescripcionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalDescripcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
