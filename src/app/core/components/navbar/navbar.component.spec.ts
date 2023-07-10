import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from '@core/services/http.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule, HttpClientModule],
      providers: [HttpService],
      declarations: [NavbarComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('validar el metodo menu abierto', () => {
    component.menuUsuario();
    expect(component.estaAbierto).toBeTruthy();
  });

  it('debería establecer "administrador" en verdadero si el usuario tiene el rol de "ROLE_ADMINISTRADOR"', () => {
    component.usuario = {
      roles: [
        { nombre: 'ROLE_ADMINISTRADOR' }
      ]
    };

    component.filtrarMenu();
    expect(component.administrador).toBeTruthy();
  });

  it('debería establecer "tieneAsociacion" en verdadero si el usuario tiene el rol de "ROLE_ASOCIACION"', () => {
    component.usuario = {
      roles: [
        { nombre: 'ROLE_ASOCIACION' }
      ]
    };

    component.filtrarMenu();
    expect(component.tieneAsociacion).toBeTruthy();
  });

  it('no debería modificar "administrador" ni "tieneAsociacion" si el usuario no tiene los roles correspondientes', () => {
    component.usuario = {
      roles: [
        { nombre: 'ROLE_OTRO' }
      ]
    };

    component.filtrarMenu();
    expect(component.administrador).toBeFalsy();
    expect(component.tieneAsociacion).toBeFalsy();
  });
});
