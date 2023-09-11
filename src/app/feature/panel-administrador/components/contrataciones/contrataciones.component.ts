import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AdministradorService } from '../../shared/service/administrador.service';

@Component({
  selector: 'app-contrataciones',
  templateUrl: './contrataciones.component.html',
  styleUrls: ['./contrataciones.component.scss']
})
export class ContratacionesComponent implements OnInit {
  necesidadAprobadas: any[] = [];
  hayNecesidadesPorConcretar = false;
  estaCargandoGuardarContrato = false;
  mensajeError = '';
  contrato;

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
    this.necesidadAprobadas = [];
    let petecionAprobar;

    this.admistradorService.consultarNecesidadesAprobadas().subscribe((response) => {
      petecionAprobar = response;
      this.necesidadAprobadas = petecionAprobar;

      if (this.necesidadAprobadas.length > 0) {
        this.hayNecesidadesPorConcretar = true;
      }
    }, (error) => {
      this.mensajeError = error.message;
    });
  }

  recibirUrlContrato(valor, necesidadId: number): void {
    this.estaCargandoGuardarContrato = true;

    this.consultaContrato(necesidadId);

    const contratoAlmacenar = {
      rutaArchivo: valor
    };

    if (this.contrato === null) {
      this.guardarContrato(necesidadId, contratoAlmacenar);
    } else {
      this.actualizarContrato(necesidadId, contratoAlmacenar);
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

  guardarContrato(necesidadId: number, contrato): void {
    this.admistradorService.guardarContrato(necesidadId, contrato).subscribe(() => {
      window.location.reload();
    }, (error) => {
      this.estaCargandoGuardarContrato = false;
      this.mensajeError = error?.error?.mensaje;
    });
  }

  actualizarContrato(necesidadId: number, contrato): void {
    this.admistradorService.actualizarContrato(necesidadId, contrato).subscribe(() => {
      window.location.reload();
    }, (error) => {
      this.estaCargandoGuardarContrato = false;
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
