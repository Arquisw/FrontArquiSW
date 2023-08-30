import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IngenieriaDeRequisitosService } from '../../shared/service/ingenieria-de-requisitos.service';
import { EtapaResumen } from '../../shared/model/etapa-resumen.module';

@Component({
  selector: 'app-etapa',
  templateUrl: './etapa.component.html',
  styleUrls: ['./etapa.component.scss']
})
export class EtapaComponent implements OnInit {
  etapaId = 0;
  etapaResumen: EtapaResumen;
  authorities: string[] = [];
  puedeAprobarEtapa = false;

  constructor(private viewportScroller: ViewportScroller, private ingenieriaDeRequisitosService: IngenieriaDeRequisitosService) {}

  ngOnInit(): void {
    this.posicionarPaginaAlInicio();

    const params = history.state;
    this.etapaId = params.id;

    this.consultarEtapaPorId(this.etapaId);
    this.obtenerAuthorities();
    this.filtrarMenu();
  }

  posicionarPaginaAlInicio(): void {
    this.viewportScroller.scrollToPosition([0, 0]);
  }

  consultarEtapaPorId(id: number): void {
    this.ingenieriaDeRequisitosService.consultarEtapaPorId(id).subscribe((response) => {
      this.etapaResumen = response;
    });
  }

  obtenerAuthorities(): void {
    const token = window.sessionStorage.getItem('Authorization');
    const tokenPayload = JSON.parse(atob(token.split('.')[1]));
    this.authorities = tokenPayload.authorities.split(',');
  }

  filtrarMenu(): void {
    this.authorities.forEach(authority => {
      if (authority === 'ROLE_INGENIERIA') {
        this.puedeAprobarEtapa = true;
      }
    });
  }

  obtenerEstadoDeLaEtapa(): string {
    if(this.etapaResumen.completada) {
      return 'Etapa Completada';
    } else {
      return 'Etapa NO Completada';
    }
  }

  abrirRequisitos(id: number): void {
    console.log(id);
  }

  aprobarEtapa(id: number): void {
    console.log(id);
  }

  declinarEtapa(id: number): void {
    console.log(id);
  }
}
