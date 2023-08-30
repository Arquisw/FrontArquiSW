import { Component, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { MenuItem } from '@core/modelo/menu-item';
import { Usuario } from '@core/modelo/usuario.modelo';
import { AsociacionService } from '@core/services/asociacion.service';
import { GestionUsuarioService } from '@core/services/login.service';
import Modal from 'bootstrap/js/dist/modal';

@Component({
  selector: 'app-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @Input() items: MenuItem[];

  configuracionMenu: MenuItem;
  recuperarClaveMenu: MenuItem;
  principalItems: MenuItem[];
  standarItems: MenuItem[];
  itemsPreLogin: MenuItem[];
  loginModal: Modal| undefined;
  registroAsociacion: Modal| undefined;
  loginError = false;
  registroError= false;
  registroExitoso= false;
  inicioSesion = false;
  estaAbierto = false;
  administrador = false;
  tieneAsociacion = false;
  estaPostulado = false;
  estaSeleccionado = false;
  opcionSeleccionada = false;
  authorities: string[] = [];
  mensajeError= '';
  id = 0;
  usuarioId;
  persona;
  mensajeRegistro= 'Se ha registrado la cuenta exitosamente, debe logearse para ingresar';
  mensajeAsociacion= 'Se ha registrado la Asociacion exitosamente';
  loginForm: FormGroup;
  registroForm: FormGroup;
  registroAsociacionForm: FormGroup;
  wdw = window;

  constructor(private formBuilder: FormBuilder,
              private servicioGestionusuario: GestionUsuarioService,
              private asociasociacionService: AsociacionService,
              private router: Router,
              private elementRef: ElementRef)  { }

  @HostListener('document:click', ['$event'])
  cerrarMenu(event: MouseEvent) {
    const clickedInside = this.elementRef.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.estaAbierto = false;
    }
  }

  ngOnInit(): void {
    this.principalItems = this.items?.filter(item => (item.nombre !== 'Configuración' && item.nombre !== 'Mi asociación' && item.nombre !== 'Mi Perfil' && item.nombre !== 'Recuperar Clave' &&  item.nombre !== 'panel-administrador'));
    this.configuracionMenu = this.items?.find(item => item.nombre === 'Configuración');
    this.recuperarClaveMenu = this.items?.find(item => item.nombre === 'Recuperar Clave');
    this.inicioSesion = window.sessionStorage.getItem('Authorization') != null;

    if(this.inicioSesion) {
      this.standarItems = this.principalItems;

      const token = window.sessionStorage.getItem('Authorization');
      const tokenPayload = JSON.parse(atob(token.split('.')[1]));

      this.id = tokenPayload.id;
      this.authorities = tokenPayload.authorities.split(',');

      this.filtrarMenu();
      this.consultarPersona();
    } else {
      this.standarItems = this.principalItems.filter((item) => item.nombre !== 'Proyectos');
    }

    this.loginForm = new FormGroup({
      correoLogin: new FormControl(''),
      claveLogin: new FormControl('')
    });

    this.registroForm = new FormGroup({
      nombreRegistro: new FormControl(''),
      apellidosRegistro: new FormControl(''),
      correoRegistro: new FormControl(''),
      claveRegistro: new FormControl(''),
      confirmarClaveRegistro: new FormControl('')
    });

    this.registroAsociacionForm = this.formBuilder.group({
      nombreAsociacion: [null, Validators.required],
      nit: [null, Validators.required],
      numeroContacto: [null, Validators.required]
    });
  }

  filtrarMenu(): void {
    this.authorities.forEach(authority => {
      if (authority === 'ROLE_ADMINISTRADOR') {
        this.administrador = true;
      }

      if (authority === 'ROLE_ASOCIACION') {
        this.tieneAsociacion = true;
      }

      if (authority === 'ROLE_POSTULACION') {
        this.estaPostulado = true;
      }

      if (authority === 'ROLE_SELECCION') {
        this.estaSeleccionado = true;
      }
    });
  }

  abrirPerfil(): void {
    const navigationExtras: NavigationExtras = {
      state: {
        id: null,
        usuario: this.persona,
      }
    };

    this.cerrarMenuDeplegable();
    this.router.navigate(['/perfil'], navigationExtras);
  }

  abrirAsociacion(): void {
    const navigationExtras: NavigationExtras = {
      state: {
        id: this.id,
        asociacion: true,
      }
    };

    this.cerrarMenuDeplegable();
    this.router.navigate(['/asociacion'], navigationExtras);
  }

  open(): void {
    this.loginModal = new Modal(document.getElementById('loginModal') ?? false, {
      keyboard: false
    });

    this.loginModal?.show();
  }

  openModalAsociacion(): void {
    this.registroAsociacion = new Modal(document.getElementById('registroAsociacion') ?? false, {
      keyboard: false
    });

    this.registroAsociacion?.show();
  }

  onRecuperarClave(): void {
    this.loginModal?.hide();
  }

  onLogin(): void {
    this.loginError = false;
    window.sessionStorage.setItem('userdetails',JSON.stringify({...this.loginForm.value}));
    const usuario: Usuario= new Usuario(0,'','',this.loginForm.get('correoLogin').value,this.loginForm.get('claveLogin').value);
    this.servicioGestionusuario.validarLogin(usuario).subscribe((response) => {
      this.usuarioId = response;
      this.id = this.usuarioId.valor;
      this.consultarPersona();
      this.loginModal?.hide();
      location.reload();
      this.standarItems = this.principalItems;
      this.inicioSesion = window.sessionStorage.getItem('Authorization') != null;
      location.reload();
    },
    (error) => {
      this.mensajeError= error.error;
      this.loginError=true;
      this.loginError=true;
    });
  }

  onClickRegister(): void {
    this.registroError= false;
    const usuario: Usuario= new Usuario(0,this.registroForm.get('nombreRegistro')?.value,this.registroForm.get('apellidosRegistro')?.value,this.registroForm.get('correoRegistro')?.value,this.registroForm.get('claveRegistro')?.value);
    if(this.registroForm.get('claveRegistro')?.value===this.registroForm.get('confirmarClaveRegistro')?.value){
      this.servicioGestionusuario.registrarUsuario(usuario).subscribe((response) => {
        console.log('Data:', response);
        this.registroExitoso= true;
      },
      (error) => {
        this.registroError= true;
        this.mensajeError =error?.error?.mensaje;
      });
    }
    else{
      this.registroError= true;
      this.mensajeError= 'Las contraseñas no coinciden';
    }
  }

  menuUsuario(): void {
    this.estaAbierto = !this.estaAbierto;
  }

  consultarPersona(): void {
    this.servicioGestionusuario.consultarPersona(this.id).subscribe((response) => {
      this.persona = response;
    },
    (error) => {
      this.mensajeError=error.message;
      this.inicioSesion = false;
    });
  }

  registrarAsociacion(): void {
    const asociacion = {
      nombre: this.registroAsociacionForm.get('nombreAsociacion').value,
      nit: this.registroAsociacionForm.get('nit').value,
      numeroContacto: this.registroAsociacionForm.get('numeroContacto').value
    };
    this.asociasociacionService.registrarAsociacion(asociacion, this.id).subscribe(() => {
      this.registroAsociacionForm.reset();
      this.registroExitoso= true;
    },
    (error) => {
      this.registroError= true;
      this.mensajeError =error?.error?.mensaje;
    });
  }

  openLogOut(): void {
    this.standarItems = this.principalItems.filter((item) => item.nombre !== 'Proyectos');
    this.inicioSesion = false;
    this.router.navigate(['/inicio']);
    window.sessionStorage.removeItem('Authorization');
  }

  cerrarMenuDeplegable(): void {
    this.estaAbierto = false;
  }
}
