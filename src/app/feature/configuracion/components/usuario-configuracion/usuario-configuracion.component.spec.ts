import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioConfiguracionComponent } from './usuario-configuracion.component';

describe('UsuarioConfiguracionComponent', () => {
  let component: UsuarioConfiguracionComponent;
  let fixture: ComponentFixture<UsuarioConfiguracionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuarioConfiguracionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuarioConfiguracionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
