import { MotivoRechazoVersion } from './../../shared/model/motivo-rechazo-version.module';
import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IngenieriaDeRequisitosService } from '../../shared/service/ingenieria-de-requisitos.service';
import { EtapaResumen } from '../../shared/model/etapa-resumen.module';
import { VersionResumen } from '../../shared/model/version-resumen.module';
import { NavigationExtras, Router } from '@angular/router';
import { RequisitoResumen } from '../../shared/model/requisito-resumen.module';
import { RequisitosFinales } from '../../shared/model/requisitos-finales.module';

@Component({
  selector: 'app-etapa',
  templateUrl: './etapa.component.html',
  styleUrls: ['./etapa.component.scss']
})
export class EtapaComponent implements OnInit {
  etapaId = 0;
  proyectoId = 0;
  etapaResumen: EtapaResumen;
  versionesResumen: VersionResumen[] = [];
  estaCargandoRechazarVersion: boolean[] = [];
  authorities: string[] = [];
  puedeAprobarEtapa = false;
  puedeIniciarPrimeraVersion = false;
  puedeRechazarVersion = false;
  tieneVersiones = false;
  generarVersionInicialError = false;
  aprobarEtapaError = false;
  estaCargandoIniciarPrimeraVersion = false;
  estaCargandoAprobarEtapa = false;
  mensajeError = '';
  p = 1;

  constructor(private viewportScroller: ViewportScroller, private ingenieriaDeRequisitosService: IngenieriaDeRequisitosService, private router: Router) {
    this.versionesResumen.forEach(() => this.estaCargandoRechazarVersion.push(false));
  }

  ngOnInit(): void {
    this.posicionarPaginaAlInicio();

    const params = history.state;
    this.etapaId = params.id;
    this.proyectoId = params.proyectoId;

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

      this.consultarVersionesPorEtapaId(id);
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
    this.estaCargandoIniciarPrimeraVersion = true;
    this.ingenieriaDeRequisitosService.generarVersionInicial(id).subscribe(() => {
      window.location.reload();
    }, (error) => {
      this.estaCargandoIniciarPrimeraVersion = false;
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
    this.estaCargandoAprobarEtapa = true;

    this.ingenieriaDeRequisitosService.aprobarEtapa(id).subscribe((response) => {
      const nuevaEtapaId = response.valor;

      this.consultarNuevaEtapaPorId(nuevaEtapaId);
    }, () => {
      this.estaCargandoAprobarEtapa = false;
    });
  }

  consultarNuevaEtapaPorId(id: number): void {
    this.ingenieriaDeRequisitosService.consultarEtapaPorId(id).subscribe((response) => {
      const nuevaEtapa = response;

      if(nuevaEtapa.nombre === 'Definitiva') {
        this.construirRequisitosFinales(nuevaEtapa);
      } else {
        this.abrirEtapa(id);
      }
    });
  }

  construirRequisitosFinales(nuevaEtapa: EtapaResumen): void {
    //this.consultarVersionEtapaDefinitiva(nuevaEtapa?.id);
    console.log(nuevaEtapa);

    this.abrirIngenieriaDeRequisitos();
  }

  consultarVersionEtapaDefinitiva(id: number): void {
    this.ingenieriaDeRequisitosService.consultarVersionesPorEtapaId(id).subscribe((response) => {
      const version = response[0];

      this.consultarRequisitosPorVersionId(version?.id, id);
    });
  }

  consultarRequisitosPorVersionId(id: number, nuevaEtapaId: number): void {
    this.ingenieriaDeRequisitosService.consultarRequisitosPorVersionId(id).subscribe((response) => {
      const requisitos = response;

      this.convertirRequisitosFinalesEnPDF(requisitos, nuevaEtapaId);
    });
  }

  convertirRequisitosFinalesEnPDF(requisitos: RequisitoResumen[], nuevaEtapaId: number): void {
    // Aqui se deberia implementar la funcionalidad para convertir los requisitos finales en pdf
    const urlRequisitosFinales = '';
    console.log(requisitos);

    this.guardarRequisitosFinales(urlRequisitosFinales, nuevaEtapaId);
  }

  guardarRequisitosFinales(urlRequisitosFinales: string, id: number): void {
    const requisitosFinales = new RequisitosFinales(urlRequisitosFinales);

    this.ingenieriaDeRequisitosService.guardarRequisitosFinales(requisitosFinales, id).subscribe(() => {});
  }

  abrirIngenieriaDeRequisitos(): void {
    const navigationExtras: NavigationExtras = {
      state: {
        id: this.proyectoId
      }
    };

    this.router.navigate(['/ingenieria-de-requisitos'], navigationExtras);
  }

  abrirEtapa(id: number): void {
    const navigationExtras: NavigationExtras = {
      state: {
        id: id,
        proyectoId: this.proyectoId
      }
    };

    this.router.navigate(['/ingenieria-de-requisitos/etapa'], navigationExtras);
  }

  rechazarVersion(motivoRechazo: string, id: number,indice: number): void {
    this.estaCargandoRechazarVersion[indice] = true;

    const motivoRechazoVersion = new MotivoRechazoVersion(motivoRechazo);

    this.ingenieriaDeRequisitosService.rechazarVersionPorId(motivoRechazoVersion, id).subscribe(() => {
      window.location.reload();
    }, () => {
      this.estaCargandoRechazarVersion[indice]  = false;
    });
  }

  obtenerIdModalRechazo(id: number): string {
    return 'rechazoModal' + id;
  }
}
