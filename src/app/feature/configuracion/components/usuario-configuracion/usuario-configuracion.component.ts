import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ConfiguracionService } from '../../shared/service/configuracion.service';
import { PersonaResumen } from '../../shared/model/persona-resumen.model';
import { AsociacionResumen } from '../../shared/model/asociacion-resumen';
import { Persona } from '../../shared/model/persona.model';
import { Clave } from '../../shared/model/clave.model';

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
  actualizacionError= false;
  actualizacionExitosa= false;
  mensajeError= '';
  mensajeActualizacion= '';
  usuarioId = 0;

  constructor(private route: ActivatedRoute, private configuracionService: ConfiguracionService) {}

  ngOnInit(): void {
    this.usuarioId = parseInt(this.route.snapshot.paramMap.get('id'), 10);

    this.consultarUsuario()

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
    this.actualizacionError= false;

    const persona: Persona = new Persona(this.actualizacionForm.get('nombreActualizacion')?.value,this.actualizacionForm.get('apellidosActualizacion')?.value,this.actualizacionForm.get('correoActualizacion')?.value);

    this.configuracionService.actualizarUsuarioPorId(persona, this.usuarioId).subscribe((response) => {
      console.log('Data:', response);
      this.actualizacionExitosa= true;
    },
    (error) => {
      this.actualizacionError = true;
      this.mensajeError = error?.error?.mensaje;
    })
  }

  onClickUpdatePassword(): void {
    this.actualizacionError= false;

    const clave: Clave = new Clave(this.actualizacionClaveForm.get('claveAntiguaActualizacion')?.value,this.actualizacionClaveForm.get('claveNuevaActualizacion')?.value);

    this.configuracionService.actualizarClavePorId(clave, this.usuarioId).subscribe((response) => {
      console.log('Data:', response);
      this.actualizacionExitosa= true;
    },
    (error) => {
      this.actualizacionError = true;
      this.mensajeError = error?.error?.mensaje;
    })
  }

  onClickDelete(): void {
    this.configuracionService.eliminarUsuarioPorId(this.usuarioId).subscribe((response) => {
      console.log('Data:', response);
      this.actualizacionExitosa= true;
    },
    (error) => {
      this.actualizacionError = true;
      this.mensajeError = error?.error?.mensaje;
    })
  }


  consultarUsuario(): void {
    this.configuracionService.consultarUsuarioPorId(this.usuarioId).subscribe((response) => {
      this.personaResumen = response;
    },
    (error) => {
      this.mensajeError = error.message;
    });
  }
}
