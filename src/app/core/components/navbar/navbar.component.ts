import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
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
  principalItems: MenuItem[];
  loginModal: Modal| undefined;
  registroAsociacion: Modal| undefined;
  loginError = false;
  registroError= false;
  registroExitoso= false;
  inicioSesion = false;
  estaAbierto = false;
  administrador = false;
  tieneAsociacion = false;
  mensajeError= '';
  id: number = 0;
  usuarioId;
  usuario;
  mensajeRegistro= 'Se ha registrado la cuenta exitosamente, debe logearse para ingresar';
  mensajeAsociacion= 'Se ha registrado la cuenta exitosamente, debe logearse para ingresar';
  loginForm: FormGroup;
  registroForm: FormGroup;
  registroAsociacionForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private servicioGestionusuario: GestionUsuarioService,
              private asociasociacionService: AsociacionService)  { }


  ngOnInit(): void {
    this.principalItems = this.items.filter(item => (item.nombre !== 'Configuración' && item.nombre !== 'Mi asociación' ));
    this.configuracionMenu = this.items.find(item => item.nombre === 'Configuración');

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

  onLogin(): void {
    this.loginError=false;
    window.sessionStorage.setItem('userdetails',JSON.stringify({...this.loginForm.value}));
    const usuario: Usuario= new Usuario(0,'','',this.loginForm.get('correoLogin').value,this.loginForm.get('claveLogin').value);
    this.servicioGestionusuario.validarLogin(usuario).subscribe((response) => {
      this.usuarioId = response;
      this.consultarusuario();
      this.id = this.usuarioId.valor;
      this.loginModal?.hide();
      this.inicioSesion = true;
    },
    (error) => {
      const estado = error.status;
      if (estado === 401){
        this.mensajeError= 'Correo o contraseña incorrectos';
      }
      else{
        this.mensajeError=error.message;
      }
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
      this.mensajeError= 'Las contraseñas no son iguales';
    }
  }

  menuUsuario(): void {
    this.estaAbierto = !this.estaAbierto;
  }

  consultarusuario(): void {
    this.servicioGestionusuario.consultarUsuario(this.usuarioId.valor).subscribe((response) => {
      this.usuario = response;
      this.filtrarMenu();
    },
    (error) => {
      this.mensajeError=error.message;
      this.inicioSesion = false;
    });
  }

  filtrarMenu(): void {
    this.usuario.roles.filter(rol => {
      if (rol.nombre === 'ROLE_ADMINISTRADOR') {
        this.administrador = true;
      }
      if (rol.nombre === 'ROLE_ASOCIACION') {
        this.tieneAsociacion = true;
      }
    });
  }

  registrarAsociacion(): void {
    const asociacion = {
      nombre: this.registroAsociacionForm.get('nombreAsociacion').value,
      nit: this.registroAsociacionForm.get('nit').value,
      numeroContacto: this.registroAsociacionForm.get('numeroContacto').value
    };
    this.asociasociacionService.registrarAsociacion(asociacion, this.usuarioId.valor).subscribe(() => {
      this.registroAsociacionForm.reset();
      this.registroExitoso= true;
    },
    (error) => {
      this.registroError= true;
      this.mensajeError =error?.error?.mensaje;
    });
  }
}
