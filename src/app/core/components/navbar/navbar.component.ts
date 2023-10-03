import { Component, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { Login } from '@core/model/login.model';
import { MenuItem } from '@core/model/menu-item.model';
import { Usuario } from '@core/model/usuario.model';
import { CoreService } from '@core/service/core.service';
import Modal from 'bootstrap/js/dist/modal';
import { UsuarioService } from '@shared/service/usuario/usuario.service';
import { PersonaResumen } from '@shared/model/usuario/persona-resumen.model';
import { Asociacion } from '@shared/model/asociacion/asociacion.model';

@Component({
  selector: 'app-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @Input() items: MenuItem[];

  configuracionMenu: MenuItem;
  recuperarClaveMenu: MenuItem;
  panelAdministradorMenu: MenuItem;
  inicioMenu: MenuItem;
  miPerfilMenu: MenuItem;
  miAsociacionMenu: MenuItem;
  principalItems: MenuItem[];
  standarItems: MenuItem[];
  itemsPreLogin: MenuItem[];
  loginModal: Modal| undefined;
  registroAsociacion: Modal| undefined;
  loginError = false;
  registroError = false;
  registroExitoso = false;
  inicioSesion = false;
  estaAbierto = false;
  administrador = false;
  tieneAsociacion = false;
  estaPostulado = false;
  estaSeleccionado = false;
  opcionSeleccionada = false;
  authorities: string[] = [];
  estaCargandoLogin = false;
  estaCargandoRegistro = false;
  estaCargandoRegistroAsociacion = false;
  mensajeError = '';
  id = 0;
  persona: PersonaResumen;
  mensajeRegistro = 'Se ha registrado la cuenta exitosamente. Debe iniciar sesión para ingresar.';
  mensajeAsociacion = 'Se ha registrado la asociación exitosamente.';
  registrarEmpresaOAsociacionOpcion = 'Registrar empresa o asociación';
  loginForm: FormGroup;
  registroForm: FormGroup;
  registroAsociacionForm: FormGroup;
  wdw = window;

  constructor(private formBuilder: FormBuilder,
              private coreService: CoreService,
              private usuarioService: UsuarioService,
              private router: Router,
              private elementRef: ElementRef) { }

  @HostListener('document:click', ['$event'])
  cerrarMenu(event: MouseEvent) {
    const clickedInside = this.elementRef.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.estaAbierto = false;
    }
  }

  ngOnInit(): void {
    this.inicializarMenu();
    this.inicializarInicioSesion();
    this.inicializarFormularios();
  }

  inicializarMenu(): void {
    this.principalItems = this.items?.filter(item => (item.nombre !== 'Configuración' && item.nombre !== 'Mi empresa o asociación' && item.nombre !== 'Mi perfil' && item.nombre !== 'Recuperar clave' &&  item.nombre !== 'Panel de administrador'));
    this.configuracionMenu = this.items?.find(item => item.nombre === 'Configuración');
    this.recuperarClaveMenu = this.items?.find(item => item.nombre === 'Recuperar clave');
    this.panelAdministradorMenu = this.items?.find(item => item.nombre === 'Panel de administrador');
    this.miPerfilMenu = this.items?.find(item => item.nombre === 'Mi perfil');
    this.miAsociacionMenu = this.items?.find(item => item.nombre === 'Mi empresa o asociación');
    this.inicioMenu = this.items?.find(item => item.nombre === 'Inicio');
  }

  inicializarInicioSesion(): void {
    this.inicioSesion = window.sessionStorage.getItem('Authorization') != null;

    if(this.inicioSesion) {
      this.standarItems = this.principalItems;

      this.inicializarParametrosDelToken();
      this.filtrarMenu();
      this.consultarPersona();
    } else {
      this.standarItems = this.principalItems.filter((item) => item.nombre !== 'Proyectos');
    }
  }

  inicializarParametrosDelToken(): void {
    const token = window.sessionStorage.getItem('Authorization');
    const tokenPayload = JSON.parse(atob(token.split('.')[1]));

    this.id = tokenPayload.id;
    this.authorities = tokenPayload.authorities.split(',');
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

  inicializarFormularios(): void {
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

  abrirPerfil(): void {
    const navigationExtras: NavigationExtras = {
      state: {
        id: null,
        usuario: this.persona,
      }
    };

    this.cerrarMenuDeplegable();
    this.router.navigate([this.miPerfilMenu?.url], navigationExtras);
  }

  abrirAsociacion(): void {
    const navigationExtras: NavigationExtras = {
      state: {
        id: this.id,
        asociacion: true,
      }
    };

    this.cerrarMenuDeplegable();
    this.router.navigate([this.miAsociacionMenu?.url], navigationExtras);
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
    this.estaCargandoLogin = true;
    this.loginError = false;

    const login: Login= new Login(this.loginForm.get('correoLogin').value, this.loginForm.get('claveLogin').value);

    this.coreService.validarLogin(login).subscribe((response) => {
      this.id = response?.valor;
      this.consultarPersona();
      this.standarItems = this.principalItems;
      this.inicioSesion = window.sessionStorage.getItem('Authorization') != null;
      this.loginModal?.hide();
      location.reload();
    },
    (error) => {
      this.estaCargandoLogin = false;
      this.mensajeError= error?.error;
      this.loginError=true;
      this.loginError=true;
    });
  }

  cerrarRegistrarAsociacion(): void {
    location.reload();
  }

  onClickRegister(): void {
    this.estaCargandoRegistro = true;
    this.registroError= false;

    const usuario: Usuario = new Usuario(this.registroForm.get('nombreRegistro')?.value, this.registroForm.get('apellidosRegistro')?.value, this.registroForm.get('correoRegistro')?.value, this.registroForm.get('claveRegistro')?.value);

    if(this.registroForm.get('claveRegistro')?.value===this.registroForm.get('confirmarClaveRegistro')?.value){
      this.coreService.registrarUsuario(usuario).subscribe(() => {
        this.estaCargandoRegistro = false;
        this.registroExitoso= true;
      },
      (error) => {
        this.estaCargandoRegistro = false;
        this.registroError= true;
        this.mensajeError =error?.error?.mensaje;
      });
    }
    else{
      this.estaCargandoRegistro = false;
      this.registroError= true;
      this.mensajeError= 'Las contraseñas no coinciden.';
    }
  }

  menuUsuario(): void {
    this.estaAbierto = !this.estaAbierto;
  }

  consultarPersona(): void {
    this.usuarioService.consultarPersonaPorId(this.id).subscribe((response) => {
      this.persona = response;
    },
    (error) => {
      this.mensajeError = error.message;
      this.inicioSesion = false;
    });
  }

  registrarAsociacion(): void {
    this.estaCargandoRegistroAsociacion = true;

    const asociacion = new Asociacion(this.registroAsociacionForm.get('nombreAsociacion').value, this.registroAsociacionForm.get('nit').value, this.registroAsociacionForm.get('numeroContacto').value);

    this.coreService.registrarAsociacion(asociacion, this.id).subscribe(() => {
      this.estaCargandoRegistroAsociacion = false;
      this.registroAsociacionForm.reset();
      this.registroExitoso= true;
    },
    (error) => {
      this.estaCargandoRegistroAsociacion = false;
      this.registroError= true;
      this.mensajeError =error?.error?.mensaje;
    });
  }

  openLogOut(): void {
    this.standarItems = this.principalItems.filter((item) => item.nombre !== 'Proyectos');
    this.inicioSesion = false;
    window.sessionStorage.removeItem('Authorization');
    this.router.navigate([this.inicioMenu.url]).then(() => {
      window.location.reload();
    });
  }

  cerrarMenuDeplegable(): void {
    this.estaAbierto = false;
  }
}
