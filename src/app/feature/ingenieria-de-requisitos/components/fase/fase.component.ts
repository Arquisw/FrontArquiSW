import { Component, Input, OnInit } from '@angular/core';
import { FaseResumen } from '../../shared/model/fase-resumen.module';
import { Router, NavigationExtras } from '@angular/router';
import { IngenieriaDeRequisitosService } from '../../shared/service/ingenieria-de-requisitos.service';

@Component({
  selector: 'app-fase',
  templateUrl: './fase.component.html',
  styleUrls: ['./fase.component.scss']
})
export class FaseComponent implements OnInit {
  @Input() fase: FaseResumen;
  urlArchivo = '';
  files = [];

  constructor(private router: Router,
              private ingenieriaDeRequisitosService: IngenieriaDeRequisitosService) { }
              
  ngOnInit(): void {
    if(this.fase?.nombre === 'Cierre') {
      this.consultarRequisitosDefinitivosPorEtapaId(this.fase?.etapas[0]?.id);
    }
  }

  consultarRequisitosDefinitivosPorEtapaId(id: number) {
    this.ingenieriaDeRequisitosService.consultarRequisitosFinalesPorEtapaID(id).subscribe((response) => {
      this.urlArchivo = response.rutaArchivo;
    });
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

  downloadFile(nombre: string): void {
    console.log(nombre);
  }
}
