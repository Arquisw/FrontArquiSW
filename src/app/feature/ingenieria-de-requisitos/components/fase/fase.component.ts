import { Component, Input, OnInit } from '@angular/core';
import { FaseResumen } from '../../shared/model/fase-resumen.module';
import { Router, NavigationExtras } from '@angular/router';
import { IngenieriaDeRequisitosService } from '../../shared/service/ingenieria-de-requisitos.service';
import { PdfMakeService } from '../../../../shared/service/pdf-make/pdf-make.service';
import { RequisitoResumen } from '../../shared/model/requisito-resumen.module';
import { ProyectoService } from '@shared/service/proyecto/proyecto.service';
import { ProyectoResumen } from '@shared/model/proyecto/proyecto-resumen.model';

@Component({
  selector: 'app-fase',
  templateUrl: './fase.component.html',
  styleUrls: ['./fase.component.scss']
})
export class FaseComponent implements OnInit {
  @Input() fase: FaseResumen;
  proyectoResumen: ProyectoResumen;
  requisitosFinales: RequisitoResumen[] = [];
  urlArchivo = '';
  detalleDocumento;
  files = [];

  constructor(private router: Router,
              private proyectoService: ProyectoService,
              private ingenieriaDeRequisitosService: IngenieriaDeRequisitosService,
              private pdfMakeService: PdfMakeService) { }

  ngOnInit(): void {
    if(this.fase?.nombre === 'Cierre') {
      this.consultarProyectoPorId(this.fase?.proyectoID);
    }
  }

  obtenerIdModalDescripcion(id: number): string {
    return 'descripcionModal' + id;
  }

  abrirEtapa(id: number): void {
    const navigationExtras: NavigationExtras = {
      state: {
        id: id,
        proyectoId: this.fase?.proyectoID
      }
    };

    this.router.navigate(['/ingenieria-de-requisitos/etapa'], navigationExtras);
  }

  esEtapaDefinitiva(): boolean {
    return this.fase?.nombre === 'Cierre';
  }

  consultarProyectoPorId(id: number): void {
    this.proyectoService.consultarProyectoPorId(id).subscribe((response) => {
      this.proyectoResumen = response;

      this.consultarVersionEtapaDefinitiva(this.fase?.etapas[0]?.id);
    });
  }

  consultarVersionEtapaDefinitiva(id: number): void {
    this.ingenieriaDeRequisitosService.consultarVersionesPorEtapaId(id).subscribe((response) => {
      const version = response[0];

      this.consultarRequisitosPorVersionId(version?.id);
    });
  }

  consultarRequisitosPorVersionId(id: number): void {
    this.ingenieriaDeRequisitosService.consultarRequisitosPorVersionId(id,0).subscribe((response) => {
      this.requisitosFinales = response;
    });
  }

  abrirArchivo(): void {
    this.pdfMakeService.crearPDF(this.proyectoResumen.nombre, this.requisitosFinales);
  }
}
