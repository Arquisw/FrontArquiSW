import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AdministradorService } from 'src/app/feature/panel-administrador/shared/service/administrador.service';
import { NecesidadResumen } from 'src/app/feature/proyectos/shared/model/necesidad-resumen.model';

@Component({
  selector: 'app-postulaciones',
  templateUrl: './postulaciones.component.html',
  styleUrls: ['./postulaciones.component.scss']
})
export class PostulacionesComponent implements OnInit {
  necesidadesResumen: NecesidadResumen[] = [];

  constructor(private administradorService: AdministradorService, private router: Router) { }

  ngOnInit(): void {
    this.consultarNecesidades();
  }

  consultarNecesidades(): void {
    this.administradorService.consultarProyectosNegociados().subscribe((response) => {
      this.necesidadesResumen = response;
    });
  }

  abrirPostulacionesDelProyecto(id: number): void {
    const navigationExtras: NavigationExtras = {
      state: {
        id: id
      }
    };
    this.router.navigate(['./panel-administrador/postulaciones-proyecto'], navigationExtras);
  }
}
