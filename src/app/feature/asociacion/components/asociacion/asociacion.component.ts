import { Component, OnInit } from '@angular/core';
import { AsociacionService } from '../../shared/service/asociacion.service';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-asociacion',
  templateUrl: './asociacion.component.html',
  styleUrls: ['./asociacion.component.scss']
})
export class AsociacionComponent implements OnInit {

  id;
  mensajeError= '';
  asociacion;
  esMiAsociacion = true;

  constructor(private viewportScroller: ViewportScroller, private miAsociacionService: AsociacionService) { }

  ngOnInit(): void {
    const params = history.state;
    this.id = params.id;
    this.esMiAsociacion = params.asociacion;

    this.viewportScroller.scrollToPosition([0, 0]);

    if(this.esMiAsociacion === true) {
      this.consultaAsociacionUsuarioId();
    } else {
      this.consultaAsociacion();
    }
  }

  consultaAsociacionUsuarioId(): void {
    this.miAsociacionService.consultarAsociacionPorUsuario(this.id).subscribe((response) => {
      this.asociacion = response;
    },
    (error) => {
      this.mensajeError=error.message;
    });
  }

  consultaAsociacion(): void {
    this.miAsociacionService.consultarAsociacion(this.id).subscribe((response) => {
      this.asociacion = response;
    },
    (error) => {
      this.mensajeError=error.message;
    });
  }

}
