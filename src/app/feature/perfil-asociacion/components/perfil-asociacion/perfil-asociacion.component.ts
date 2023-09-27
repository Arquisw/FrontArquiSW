import { Component, OnInit } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { AsociacionService } from '@shared/service/asociacion/asociacion.service';
import { AsociacionResumen } from '@shared/model/asociacion/asociacion-resumen.model';

@Component({
  selector: 'app-perfil-asociacion',
  templateUrl: './perfil-asociacion.component.html',
  styleUrls: ['./perfil-asociacion.component.scss']
})
export class PerfilAsociacionComponent implements OnInit {
  id = 0;
  mensajeError= '';
  asociacion: AsociacionResumen;
  esMiAsociacion = true;

  constructor(private viewportScroller: ViewportScroller, private asociacionService: AsociacionService) { }

  ngOnInit(): void {
    const params = history.state;
    this.id = params.id;
    this.esMiAsociacion = params.asociacion;

    this.posicionarPaginaAlInicio();

    if(this.esMiAsociacion === true) {
      this.consultaAsociacionUsuarioId();
    } else {
      this.consultaAsociacion();
    }
  }

  posicionarPaginaAlInicio(): void {
    this.viewportScroller.scrollToPosition([0, 0]);
  }

  consultaAsociacionUsuarioId(): void {
    this.asociacionService.consultarAsociacionPorUsuarioId(this.id).subscribe((response) => {
      this.asociacion = response;
    },
    (error) => {
      this.mensajeError=error.message;
    });
  }

  consultaAsociacion(): void {
    this.asociacionService.consultarAsociacionPorId(this.id).subscribe((response) => {
      this.asociacion = response;
    },
    (error) => {
      this.mensajeError=error.message;
    });
  }
}
