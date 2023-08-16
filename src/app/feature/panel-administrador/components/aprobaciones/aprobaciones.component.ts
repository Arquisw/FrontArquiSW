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

  constructor(private router: Router,private admistradorService: AdministradorService)  { }

  ngOnInit(): void {
    this.consultaAprobaciones();
  }

  obtnerIdModal(id: number): string {
    return 'descripcionModal' + id;
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

      console.log(this.necesidadAprobar);
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
