import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AdministradorService } from '../../shared/service/administrador.service';

@Component({
  selector: 'app-contrataciones',
  templateUrl: './contrataciones.component.html',
  styleUrls: ['./contrataciones.component.scss']
})
export class ContratacionesComponent {
  necesidadAprobadas: any[] = [];
  mensajeError= '';

  constructor(private router: Router, private admistradorService: AdministradorService)  { }

  consultaAprobaciones(): void {
    this.necesidadAprobadas= [];
    let petecionAprobar;
    this.admistradorService.consultarNecesidadesPendienteAprobacion().subscribe((response) => {
      petecionAprobar = response;
      this.necesidadAprobadas = petecionAprobar;
      console.log(this.necesidadAprobadas);
    },
    (error) => {
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
