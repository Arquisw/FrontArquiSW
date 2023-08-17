import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AsociacionResumen } from '../../shared/model/asociacion-resumen.model';
import { ConfiguracionService } from '../../shared/service/configuracion.service';
import { Asociacion } from '../../shared/model/asociacion.model';

@Component({
  selector: 'app-asociacion-configuracion',
  templateUrl: './asociacion-configuracion.component.html',
  styleUrls: ['./asociacion-configuracion.component.scss']
})
export class AsociacionConfiguracionComponent implements OnInit {
  actualizacionForm: FormGroup;
  asociacionResumen: AsociacionResumen;
  actualizacionError = false;
  actualizacionExitosa = false;
  eliminacionExitosa = false;
  eliminacionError = false;
  mensajeError= '';
  mensajeActualizacion= '';
  usuarioId = 0;

  constructor(private configuracionService: ConfiguracionService, private router: Router) {}

  ngOnInit(): void {
    const token = window.sessionStorage.getItem('Authorization');
    const tokenPayload = JSON.parse(atob(token.split('.')[1]));
    this.usuarioId = tokenPayload.id;

    this.consultarAsociacion();

    this.actualizacionForm = new FormGroup({
      nombreActualizacion: new FormControl(''),
      nitActualizacion: new FormControl(''),
      numeroContactoActualizacion: new FormControl(''),
    });
  }

  onClickUpdate(): void {
    this.actualizacionError= false;

    const asociacion: Asociacion = new Asociacion(this.actualizacionForm.get('nombreActualizacion')?.value,this.actualizacionForm.get('nitActualizacion')?.value,this.actualizacionForm.get('numeroContactoActualizacion')?.value);

    this.configuracionService.actualizarAsociacionPorId(asociacion, this.usuarioId).subscribe((response) => {
      console.log('Data:', response);
      window.location.reload();
    },
    (error) => {
      this.actualizacionError = true;
      this.mensajeError = error?.error?.mensaje;
    });
  }

  onClickDelete(): void {
    this.configuracionService.eliminarAsociacionPorId(this.asociacionResumen.id).subscribe((response) => {
      console.log('Data:', response);
      this.eliminacionExitosa= true;
      this.router.navigate(['/configuracion/']);
    },
    (error) => {
      this.eliminacionError = true;
      this.mensajeError = error?.error?.mensaje;
    });
  }

  consultarAsociacion(): void {
    this.configuracionService.consultarAsociacionPorId(this.usuarioId).subscribe((response) => {
      this.asociacionResumen = response;
    },
    (error) => {
      this.mensajeError = error.message;
    });
  }
}
