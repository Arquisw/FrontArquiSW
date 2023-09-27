import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarseModalComponent } from './registrarse-modal.component';

describe('RegistrarseModalComponent', () => {
  let component: RegistrarseModalComponent;
  let fixture: ComponentFixture<RegistrarseModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrarseModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarseModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
