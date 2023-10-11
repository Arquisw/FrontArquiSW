import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IngenieriaDeRequisitosService } from '../../shared/service/ingenieria-de-requisitos.service';
import { FaseResumen } from '../../shared/model/fase-resumen.module';
import { ProyectoService } from '@shared/service/proyecto/proyecto.service';
import { ProyectoResumen } from '@shared/model/proyecto/proyecto-resumen.model';
import { TokenService } from '@shared/service/token/token.service';

@Component({
  selector: 'app-ingenieria-de-requisitos',
  templateUrl: './ingenieria-de-requisitos.component.html',
  styleUrls: ['./ingenieria-de-requisitos.component.scss']
})
export class IngenieriaDeRequisitosComponent implements OnInit {
  proyectoId = 0;
  proyectoResumen: ProyectoResumen;
  fasesResumen: FaseResumen[] = [];
  inicioElProcesoDeConsultoria = false;

  constructor(private tokenService: TokenService, private viewportScroller: ViewportScroller, private proyectoService: ProyectoService, private ingenieriaDeRequisitosService: IngenieriaDeRequisitosService) { }

  ngOnInit(): void {
    this.tokenService.actualizarToken();
    
    this.posicionarPaginaAlInicio();

    const params = history.state;
    this.proyectoId = params.id;

    this.consultarProyectoPorId(this.proyectoId);
    this.consultarFasesDelProyecto(this.proyectoId);
  }

  posicionarPaginaAlInicio(): void {
    this.viewportScroller.scrollToPosition([0, 0]);
  }

  consultarProyectoPorId(id: number): void {
    this.proyectoService.consultarProyectoPorId(id).subscribe((response) => {
      this.proyectoResumen = response;

      this.evaluarSiInicioElProcesoDeConsultoria();
    });
  }

  evaluarSiInicioElProcesoDeConsultoria(): void {
    if (this.proyectoResumen.aprobacionProyecto.ingenieria &&
      this.proyectoResumen.aprobacionProyecto.liderDeEquipo &&
      this.proyectoResumen.aprobacionProyecto.directorDeProyecto) {
      this.inicioElProcesoDeConsultoria = true;
    }
  }

  consultarFasesDelProyecto(id: number): void {
    this.ingenieriaDeRequisitosService.consultarFasesPorProyectoPorId(id).subscribe((response) => {
      this.fasesResumen = response;

      if(this.fasesResumen.length > 0) {
        this.inicioElProcesoDeConsultoria = true;
      }
    });
  }
}
