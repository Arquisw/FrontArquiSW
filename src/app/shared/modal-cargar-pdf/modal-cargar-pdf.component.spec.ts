import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCargarPdfComponent } from './modal-cargar-pdf.component';

describe('ModalCargarPdfComponent', () => {
  let component: ModalCargarPdfComponent;
  let fixture: ComponentFixture<ModalCargarPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCargarPdfComponent ]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalCargarPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
