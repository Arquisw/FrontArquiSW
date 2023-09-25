import Modal from 'bootstrap/js/dist/modal';
import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IngenieriaDeRequisitosService } from '../../shared/service/ingenieria-de-requisitos.service';
import { VersionResumen } from '../../shared/model/version-resumen.module';
import { RequisitoResumen } from '../../shared/model/requisito-resumen.module';
import { FormControl, FormGroup } from '@angular/forms';
import { Requisito } from '../../shared/model/requisito.model';
import { TipoRequisito } from '../../shared/model/tipo-requisito.module';

@Component({
  selector: 'app-version',
  templateUrl: './version.component.html',
  styleUrls: ['./version.component.scss']
})
export class VersionComponent implements OnInit {
  crearRequisito: Modal | undefined;
  versionId = 0;
  versionResumen: VersionResumen;
  requisitoActualId = 0;
  requisitosResumen: RequisitoResumen[] = [];
  authorities: string[] = [];
  puedeGenerarVersionFinal = false;
  puedeGestionarRequisito = false;
  guardadoError = false;
  estaCargandoGenerarVersionFinal = false;
  estaCargandoGuardarRequisito = false;
  generarVersionFinalError = false;
  puedeCrearRequisito = false;
  mensajeError = '';
  guardarRequisitoForm: FormGroup;
  seleccionarMensaje = 'Seleccionar';

  constructor(private viewportScroller: ViewportScroller, private ingenieriaDeRequisitosService: IngenieriaDeRequisitosService) {}

  ngOnInit(): void {
    this.posicionarPaginaAlInicio();

    this.obtenerVersionId();
    this.obtenerAuthorities();
    this.filtrarMenu();
    this.consultarVersionPorId(this.versionId);
    this.consultarRequisitosPorVersionId(this.versionId);
    this.inicializarFormulario();
    this.inicializarPuedeCrearRequisito();
  }



  posicionarPaginaAlInicio(): void {
    this.viewportScroller.scrollToPosition([0, 0]);
  }

  obtenerVersionId(): void {
    const params = history.state;
    this.versionId = params.id;

  }

  obtenerAuthorities(): void {
    const token = window.sessionStorage.getItem('Authorization');
    const tokenPayload = JSON.parse(atob(token.split('.')[1]));
    this.authorities = tokenPayload.authorities.split(',');
  }

  filtrarMenu(): void {
    this.authorities.forEach(authority => {
      if (authority === 'ROLE_INGENIERIA') {
        this.puedeGenerarVersionFinal = true;
      }

      if (authority === 'ROLE_EQUIPO_DESARROLLO') {
        this.puedeGestionarRequisito = true;
      }
    });
  }

  consultarVersionPorId(id: number): void {
    this.ingenieriaDeRequisitosService.consultarVersionPorId(id).subscribe((response) => {
      this.versionResumen = response;
    });
  }

  consultarRequisitosPorVersionId(id: number): void {
    this.ingenieriaDeRequisitosService.consultarRequisitosPorVersionId(id).subscribe((response) => {
      this.requisitosResumen = response;
    });
  }

  inicializarFormulario(): void {
    this.guardarRequisitoForm = new FormGroup({
      nombreRequisito: new FormControl(''),
      descripcionRequisito: new FormControl(''),
      tipoRequisito: new FormControl('')
    });
  }

  inicializarPuedeCrearRequisito(): void {
    this.puedeCrearRequisito = this.versionResumen?.estaRechazada || this.versionResumen?.esFinal;
  }

  abrirModalCrearRequisito(id: number): void {
    this.crearRequisito = new Modal(document.getElementById('crearRequisitoModal') ?? false, {
      keyboard: false
    });

    this.requisitoActualId = id;

    this.crearRequisito?.show();
  }

  onClickGuardarRequisito(): void {
    this.estaCargandoGuardarRequisito = true;
    const tipoRequisito = new TipoRequisito(this.guardarRequisitoForm.get('tipoRequisito')?.value);
    const requisito = new Requisito(this.guardarRequisitoForm.get('nombreRequisito')?.value, this.guardarRequisitoForm.get('descripcionRequisito')?.value, tipoRequisito);

    this.ingenieriaDeRequisitosService.guardarRequisito(requisito, this.versionId).subscribe(() => {
      this.crearRequisito?.hide();
      window.location.reload();
    }, (error) => {
      this.estaCargandoGuardarRequisito = false;
      this.guardadoError = true;
      this.mensajeError = error?.error?.mensaje;
    });
  }

  generarVersionFinal(id: number): void {
    this.estaCargandoGenerarVersionFinal = true;

    this.ingenieriaDeRequisitosService.generarVersionFinal(id).subscribe(() => {
      window.location.reload();
    }, (error) => {
      this.estaCargandoGenerarVersionFinal = false;
      this.generarVersionFinalError = true;
      this.mensajeError = error?.error?.mensaje;
    });
  }
}
