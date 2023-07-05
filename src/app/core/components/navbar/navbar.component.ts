import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MenuItem } from '@core/modelo/menu-item';
import { Usuario } from '@core/modelo/usuario.modelo';
import { GestionUsuarioService } from '@core/services/login.service';
import Modal from 'bootstrap/js/dist/modal';

@Component({
  selector: 'app-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @Input() items: MenuItem[];
  loginModal: Modal| undefined;
  registroAsociacion: Modal| undefined;
  loginError = false;
  registroError= false;
  registroExitoso= false;
  inicioSesion = false;
  estaAbierto = false;
  mensajeError= '';
  usuarioId;
  usuario;
  mensajeRegistro= 'Se ha registrado la cuenta exitosamente, debe logearse para ingresar';
  loginForm: FormGroup;
  registroForm: FormGroup;
  registroAsociacionForm:FormGroup;

  constructor(private servicioGestionusuario: GestionUsuarioService)  { }

  ngOnInit(): void {
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

    this.registroAsociacionForm = new FormGroup({
      nombreAsociacion: new FormControl(''),
      nit: new FormControl(''),
      numeroContacto: new FormControl(''),
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
      this.inicioSesion = true;
      this.loginModal?.hide();
      this.consultarusuario();
    },
    (error) => {
      console.log(error);
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
    this.inicioSesion = false;
  },
  (error) => {
    console.log(error);
  });
  
}

}
