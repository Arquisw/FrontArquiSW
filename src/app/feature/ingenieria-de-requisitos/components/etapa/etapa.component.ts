import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IngenieriaDeRequisitosService } from '../../shared/service/ingenieria-de-requisitos.service';
import { EtapaResumen } from '../../shared/model/etapa-resumen.module';
import { VersionResumen } from '../../shared/model/version-resumen.module';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-etapa',
  templateUrl: './etapa.component.html',
  styleUrls: ['./etapa.component.scss']
})
export class EtapaComponent implements OnInit {
  etapaId = 0;
  etapaResumen: EtapaResumen;
  versionesResumen: VersionResumen[] = [];
  authorities: string[] = [];
  puedeAprobarEtapa = false;
  puedeIniciarPrimeraVersion = false;
  puedeRechazarVersion = false;
  tieneVersiones = false;
  generarVersionInicialError = false;
  aprobarEtapaError = false;
  mensajeError = '';

  constructor(private viewportScroller: ViewportScroller, private ingenieriaDeRequisitosService: IngenieriaDeRequisitosService, private router: Router) {}

  ngOnInit(): void {
    this.posicionarPaginaAlInicio();

    const params = history.state;
    this.etapaId = params.id;

    this.consultarEtapaPorId(this.etapaId);
    this.consultarVersionesPorEtapaId(this.etapaId);
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

  consultarVersionesPorEtapaId(id: number): void {
    this.ingenieriaDeRequisitosService.consultarVersionesPorEtapaId(id).subscribe((response) => {
      this.versionesResumen = response;

      if(this.versionesResumen.length > 0) {
        this.tieneVersiones = true;
      }
    });
  }

  obtenerAuthorities(): void {
    const token = window.sessionStorage.getItem('Authorization');
    const tokenPayload = JSON.parse(atob(token.split('.')[1]));
    this.authorities = tokenPayload.authorities.split(',');
  }

  filtrarMenu(): void {
    this.authorities.forEach(authority => {
      if (authority === 'ROLE_LIDER_DE_EQUIPO') {
        this.puedeAprobarEtapa = true;
        this.puedeRechazarVersion = true;
      }

      if (authority === 'ROLE_INGENIERIA') {
        this.puedeIniciarPrimeraVersion = true;
      }
    });
  }

  obtenerEstadoDeLaEtapa(completada: boolean): string {
    if(completada) {
      return 'Etapa Completada';
    } else {
      return 'Etapa NO Completada';
    }
  }

  obtenerEstadoDeLaVersion(estado: boolean): string {
    if(estado) {
      return 'SI';
    } else {
      return 'NO';
    }
  }

  iniciarPrimeraVersion(id: number): void {
    this.ingenieriaDeRequisitosService.generarVersionInicial(id).subscribe(() => {
      window.location.reload();
    }, (error) => {
      this.generarVersionInicialError = true;
      this.mensajeError = error?.error?.mensaje;
    });
  }

  abrirRequisitos(id: number): void {
    const navigationExtras: NavigationExtras = {
      state: {
        id: id
      }
    };

    this.router.navigate(['/ingenieria-de-requisitos/etapa/version'], navigationExtras);
  }


  aprobarEtapa(id: number): void {
    this.ingenieriaDeRequisitosService.aprobarEtapa(id).subscribe(() => {
      window.location.reload();
    });
  }

  rechazarVersion(id: number): void {
    this.ingenieriaDeRequisitosService.rechazarVersionPorId(id).subscribe(() => {
      window.location.reload();
    });
  }
}
