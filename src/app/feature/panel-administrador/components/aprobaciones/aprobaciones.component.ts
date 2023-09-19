import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AdministradorService } from '../../shared/service/administrador.service';

@Component({
  selector: 'app-aprobaciones',
  templateUrl: './aprobaciones.component.html',
  styleUrls: ['./aprobaciones.component.scss']
})
export class AprobacionesComponent implements  OnInit{
  necesidadAprobar: any[] = [];
  mensajeError= '';
  hayProyectosPorAprobar = false;
  estaCargandoAprobarNecesidad = false;
  estaCargandoDeclinarNecesidad = false;
  p = 1;

  mensajeAsociacion;
  registroError;

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
    this.necesidadAprobar= [];
    let petecionAprobar;
    this.admistradorService.consultarNecesidadesPendienteAprobacion().subscribe((response) => {
      petecionAprobar = response;
      this.necesidadAprobar = petecionAprobar;
      if(this.necesidadAprobar.length > 0) {
        this.hayProyectosPorAprobar = true;
      }
    });
  }

  AprobarNecesidad(id: number): void {
    this.estaCargandoAprobarNecesidad = true;

    this.admistradorService.aprobarNecesidad(id).subscribe(() => {
      window.location.reload();
    },
    (error) => {
      this.estaCargandoAprobarNecesidad = false;
      this.mensajeError=error.message;
    });
  }

  declinarNecesidad(motivoDeclinada: string, id: number): void {
    this.estaCargandoDeclinarNecesidad = true;

    const razonRechazo = {
      motivoRechazo: motivoDeclinada
    };

    this.admistradorService.declinarNecesidad(id, razonRechazo).subscribe(() => {
      window.location.reload();
    },
    (error) => {
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
