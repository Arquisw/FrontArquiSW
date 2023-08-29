import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IngenieriaDeRequisitosService } from '../../shared/service/ingenieria-de-requisitos.service';
import { ProyectoResumen } from 'src/app/feature/proyectos/shared/model/proyecto-resumen.model';
import { FaseResumen } from '../../shared/model/fase-resumen.module';

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

  constructor(private viewportScroller: ViewportScroller, private ingenieriaDeRequisitosService: IngenieriaDeRequisitosService) { }

  ngOnInit(): void {
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
    this.ingenieriaDeRequisitosService.consultarProyectoPorId(id).subscribe((response) => {
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
