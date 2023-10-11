import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AdministradorService } from 'src/app/feature/panel-administrador/shared/service/administrador.service';
import { NecesidadResumen } from '@shared/model/proyecto/necesidad-resumen.model';
import { TokenService } from '@shared/service/token/token.service';

@Component({
  selector: 'app-postulaciones',
  templateUrl: './postulaciones.component.html',
  styleUrls: ['./postulaciones.component.scss']
})
export class PostulacionesComponent implements OnInit {
  necesidadesResumen: NecesidadResumen[] = [];
  hayProyectosNegociados = false;
  p = 1;

  constructor(private tokenService: TokenService, private administradorService: AdministradorService, private router: Router) { }

  ngOnInit(): void {
    this.tokenService.actualizarToken();
    
    this.consultarNecesidades();
  }

  consultarNecesidades(): void {
    this.administradorService.consultarProyectosNegociados().subscribe((response) => {
      this.necesidadesResumen = response;

      if(this.necesidadesResumen.length > 0) {
        this.hayProyectosNegociados = true;
      }
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

  obtenerIdModalDescripcion(id: number): string {
    return 'descripcionModal' + id;
  }
}
