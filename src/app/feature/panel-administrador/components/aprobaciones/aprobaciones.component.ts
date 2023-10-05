import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AdministradorService } from '../../shared/service/administrador.service';
import { NecesidadResumen } from '@shared/model/proyecto/necesidad-resumen.model';
import { MotivoRechazoNecesidad } from '../../shared/model/motivo-rechazo-necesidad.model';

@Component({
  selector: 'app-aprobaciones',
  templateUrl: './aprobaciones.component.html',
  styleUrls: ['./aprobaciones.component.scss']
})
export class AprobacionesComponent implements  OnInit{
  necesidadesAprobar: NecesidadResumen[] = [];
  mensajeError = '';
  hayProyectosPorAprobar = false;
  estaCargandoAprobarNecesidad: boolean[] = [];
  estaCargandoDeclinarNecesidad = false;
  p = 1;
  mensajeAsociacion;
  registroError;
  totalPendientes = 0;

  constructor(private router: Router,private admistradorService: AdministradorService)  { }

  ngOnInit(): void {
    this.consultaAprobaciones();
  }

  obtnerIdModal(id: number): string {
    return 'descripcionModal' + id;
  }

  obtenerIdModalRechazo(id: number): string {
    return 'rechazoModal' + id;
  }

  consultaAprobaciones(): void {
    this.admistradorService.consultarNecesidadesPendienteAprobacion(this.p-1).subscribe((response) => {
      this.necesidadesAprobar = response.content;
      this.totalPendientes = response.totalElements
      if(this.necesidadesAprobar.length > 0) {
        this.hayProyectosPorAprobar = true;
      }
    });
  }

  onPageChange(event: number): void {
    this.p = event;
    this.consultaAprobaciones()
  }

  AprobarNecesidad(id: number, indice: number): void {
    this.estaCargandoAprobarNecesidad[indice] = true;

    this.admistradorService.aprobarNecesidad(id).subscribe(() => {
      window.location.reload();
    }, (error) => {
      this.estaCargandoAprobarNecesidad[indice] = false;
      this.mensajeError=error.message;
    });
  }

  declinarNecesidad(motivoDeclinada: string, id: number): void {
    this.estaCargandoDeclinarNecesidad = true;

    const razonRechazo = new MotivoRechazoNecesidad(motivoDeclinada);

    this.admistradorService.declinarNecesidad(id, razonRechazo).subscribe(() => {
      window.location.reload();
    }, (error) => {
      this.estaCargandoDeclinarNecesidad = false;
      this.mensajeError=error.message;
    });
  }

  abrirPerfilProyecto(id): void {
    const navigationExtras: NavigationExtras = {
      state: {
        id: id,
        proyecto: false,
      }
    };
    this.router.navigate(['/proyecto'], navigationExtras);
  }
}
