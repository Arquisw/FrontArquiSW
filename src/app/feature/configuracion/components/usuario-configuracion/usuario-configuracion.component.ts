import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfiguracionService } from '../../shared/service/configuracion.service';
import { PersonaResumen } from '../../shared/model/persona-resumen.model';
import { AsociacionResumen } from '../../shared/model/asociacion-resumen.model';
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
  actualizacionError = false;
  actualizacionClaveError = false;
  eliminacionError= false;
  mensajeError= '';
  mensajeActualizacion= '';
  usuarioId = 0;

  constructor(private route: ActivatedRoute, private configuracionService: ConfiguracionService, private router: Router) {}

  ngOnInit(): void {
    this.usuarioId = parseInt(this.route.snapshot.paramMap.get('id'), 10);

    this.consultarUsuario();

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
      window.location.reload();
    },
    (error) => {
      this.actualizacionError = true;
      this.mensajeError = error?.error?.mensaje;
    });
  }

  onClickUpdatePassword(): void {
    this.actualizacionError= false;

    const clave: Clave = new Clave(this.actualizacionClaveForm.get('claveAntiguaActualizacion')?.value,this.actualizacionClaveForm.get('claveNuevaActualizacion')?.value);

    if(this.actualizacionClaveForm.get('claveNuevaActualizacion')?.value===this.actualizacionClaveForm.get('confirmarClaveActualizacion')?.value) {
      this.configuracionService.actualizarClavePorId(clave, this.usuarioId).subscribe((response) => {
        console.log('Data:', response);
        window.location.reload();
      },
      (error) => {
        this.actualizacionClaveError = true;
        this.mensajeError = error?.error?.mensaje;
      });
    } else {
      this.actualizacionClaveError = true;
      this.mensajeError= 'Las contraseñas no coinciden';
    }
  }

  onClickDelete(): void {
    this.configuracionService.eliminarUsuarioPorId(this.usuarioId).subscribe((response) => {
      console.log('Data:', response);
      this.router.navigate(['/inicio']);
    },
    (error) => {
      this.eliminacionError = true;
      this.mensajeError = error?.error?.mensaje;
    });
  }

  consultarUsuario(): void {
    this.configuracionService.consultarPersonaPorId(this.usuarioId).subscribe((response) => {
      this.personaResumen = response;
    },
    (error) => {
      this.mensajeError = error.message;
    });
  }
}
