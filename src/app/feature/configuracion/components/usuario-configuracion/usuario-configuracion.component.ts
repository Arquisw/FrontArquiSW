import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfiguracionService } from '../../shared/service/configuracion.service';
import { AsociacionResumen } from '../../../../shared/model/asociacion/asociacion-resumen.model';
import { Persona } from '../../shared/model/persona.model';
import { Clave } from '../../shared/model/clave.model';
import { PersonaResumen } from '@shared/model/usuario/persona-resumen.model';
import { UsuarioService } from '@shared/service/usuario/usuario.service';
import { TokenService } from '@shared/service/token/token.service';

@Component({
  selector: 'app-usuario-configuracion',
  templateUrl: './usuario-configuracion.component.html',
  styleUrls: ['./usuario-configuracion.component.scss']
})
export class UsuarioConfiguracionComponent implements OnInit {
  actualizacionForm: FormGroup;
  actualizacionClaveForm: FormGroup;
  personaResumen: PersonaResumen;
  asociacionResumen: AsociacionResumen;
  actualizacionError = false;
  actualizacionClaveError = false;
  eliminacionError= false;
  estaCargandoActualizacion = false;
  estaCargandoActualizacionClave = false;
  estaCargandoEliminacion = false;
  mensajeError= '';
  mensajeActualizacion= '';
  correoAnterior = '';
  usuarioId = 0;

  constructor(private tokenService: TokenService, private configuracionService: ConfiguracionService, private usuarioService: UsuarioService, private router: Router) {}

  ngOnInit(): void {
    this.tokenService.actualizarToken();
    
    const token = window.sessionStorage.getItem('Authorization');
    const tokenPayload = JSON.parse(atob(token.split('.')[1]));
    this.usuarioId = tokenPayload.id;

    this.consultarUsuario();
    this.inicializarFormularios();
  }

  consultarUsuario(): void {
    this.usuarioService.consultarPersonaPorId(this.usuarioId).subscribe((response) => {
      this.personaResumen = response;
      this.correoAnterior = this.personaResumen.correo;
    },
    (error) => {
      this.mensajeError = error.message;
    });
  }

  inicializarFormularios(): void {
    this.actualizacionForm = new FormGroup({
      nombreActualizacion: new FormControl(''),
      apellidosActualizacion: new FormControl(''),
      correoActualizacion: new FormControl(''),
    });

    this.actualizacionClaveForm = new FormGroup({
      claveAntiguaActualizacion: new FormControl(''),
      claveNuevaActualizacion: new FormControl(''),
      confirmarClaveActualizacion: new FormControl(''),
    });
  }

  onClickUpdate(): void {
    this.estaCargandoActualizacion = true;
    this.actualizacionError= false;

    const persona: Persona = new Persona(this.actualizacionForm.get('nombreActualizacion')?.value,this.actualizacionForm.get('apellidosActualizacion')?.value,this.actualizacionForm.get('correoActualizacion')?.value);
    const correoNuevo = persona.correo;
    this.configuracionService.actualizarUsuarioPorId(persona, this.usuarioId).subscribe(() => {

      if(correoNuevo !== this.correoAnterior) {
        window.sessionStorage.removeItem('Authorization');
        this.router.navigate(['/']).then(() => {
          window.location.reload();
        });
      } else {
        window.location.reload();
      }
    },
    (error) => {
      this.estaCargandoActualizacion = false;
      this.actualizacionError = true;
      this.mensajeError = error?.error?.mensaje;
    });
  }

  onClickUpdatePassword(): void {
    this.estaCargandoActualizacionClave = true;
    this.actualizacionError= false;

    const clave: Clave = new Clave(this.actualizacionClaveForm.get('claveAntiguaActualizacion')?.value,this.actualizacionClaveForm.get('claveNuevaActualizacion')?.value);

    if(this.actualizacionClaveForm.get('claveNuevaActualizacion')?.value===this.actualizacionClaveForm.get('confirmarClaveActualizacion')?.value) {
      this.configuracionService.actualizarClavePorId(clave, this.usuarioId).subscribe(() => {
        window.location.reload();
      },
      (error) => {
        this.estaCargandoActualizacionClave = false;
        this.actualizacionClaveError = true;
        this.mensajeError = error?.error?.mensaje;
      });
    } else {
      this.estaCargandoActualizacionClave = false;
      this.actualizacionClaveError = true;
      this.mensajeError= 'Las contraseñas no coinciden.';
    }
  }

  onClickDelete(): void {
    this.estaCargandoEliminacion = true;

    this.configuracionService.eliminarUsuarioPorId(this.usuarioId).subscribe(() => {
      this.router.navigate(['/inicio']);
    },
    (error) => {
      this.estaCargandoEliminacion = false;
      this.eliminacionError = true;
      this.mensajeError = error?.error?.mensaje;
    });
  }
}
