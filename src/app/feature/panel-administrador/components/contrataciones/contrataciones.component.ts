import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AdministradorService } from '../../shared/service/administrador.service';
import { NecesidadResumen } from '@shared/model/proyecto/necesidad-resumen.model';
import { Contrato } from '../../shared/model/contrato.model';

@Component({
  selector: 'app-contrataciones',
  templateUrl: './contrataciones.component.html',
  styleUrls: ['./contrataciones.component.scss']
})
export class ContratacionesComponent implements OnInit {
  necesidadesAprobadas: NecesidadResumen[] = [];
  hayNecesidadesPorConcretar = false;
  estaCargandoGuardarContrato: boolean[] = [];
  mensajeError = '';
  contrato;
  p = 1;
  totalContrataciones=0;

  constructor(private router: Router, private admistradorService: AdministradorService) { }

  ngOnInit(): void {
    this.consultaAprobaciones();
  }

  obtnerIdModal(id: number): string {
    return 'descripcionModal' + id;
  }

  obtnerIdModalCarga(id: number): string {
    return 'cargaModal' + id;
  }

  consultaAprobaciones(): void {
    this.admistradorService.consultarNecesidadesAprobadas(this.p-1,5).subscribe((response) => {
      this.necesidadesAprobadas = response.content;
      this.totalContrataciones = response.totalElements;
      if (this.necesidadesAprobadas.length > 0) {
        this.hayNecesidadesPorConcretar = true;
      }
    }, (error) => {
      this.mensajeError = error.message;
    });
  }

  onPageChange(event: number): void {
    this.p = event;
    this.consultaAprobaciones();
  }

  recibirUrlContrato(valor, necesidadId: number, indice: number): void {
    this.estaCargandoGuardarContrato[indice] = true;

    this.consultaContrato(necesidadId);

    const contratoAlmacenar = new Contrato(valor);

    if (this.contrato === null) {
      this.guardarContrato(necesidadId, contratoAlmacenar, indice);
    } else {
      this.actualizarContrato(necesidadId, contratoAlmacenar, indice);
    }
  }

  consultaContrato(necesidadId: number): void {
    this.contrato = null;
    this.admistradorService.consultarContrato(necesidadId).subscribe((response) => {
      this.contrato = response;
    },
    (error) => {
      this.mensajeError = error.message;
    });
  }

  guardarContrato(necesidadId: number, contrato, indice: number): void {
    this.admistradorService.guardarContrato(necesidadId, contrato).subscribe(() => {
      window.location.reload();
    }, (error) => {
      this.estaCargandoGuardarContrato[indice] = false;
      this.mensajeError = error?.error?.mensaje;
    });
  }

  actualizarContrato(necesidadId: number, contrato, indice: number): void {
    this.admistradorService.actualizarContrato(necesidadId, contrato).subscribe(() => {
      window.location.reload();
    }, (error) => {
      this.estaCargandoGuardarContrato[indice] = false;
      this.mensajeError = error?.error?.mensaje;
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
