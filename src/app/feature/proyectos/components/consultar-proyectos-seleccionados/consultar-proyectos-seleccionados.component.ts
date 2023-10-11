import { Component, OnInit } from '@angular/core';
import { NecesidadResumen } from '../../../../shared/model/proyecto/necesidad-resumen.model';
import { SeleccionResumen } from '../../shared/model/seleccion-resumen.model';
import { ProyectosService } from '../../shared/service/proyectos.service';
import { NavigationExtras, Router } from '@angular/router';
import { ProyectoResumen } from '@shared/model/proyecto/proyecto-resumen.model';
import { ProyectoService } from '@shared/service/proyecto/proyecto.service';
import { RolesService } from '@shared/service/roles/roles.service';
import { TokenService } from '@shared/service/token/token.service';

@Component({
  selector: 'app-consultar-proyectos-seleccionados',
  templateUrl: './consultar-proyectos-seleccionados.component.html',
  styleUrls: ['./consultar-proyectos-seleccionados.component.scss']
})
export class ConsultarProyectosSeleccionadosComponent implements OnInit {
  proyectoResumen: ProyectoResumen;
  proyectosResumen: ProyectoResumen[] = [];
  seleccionResumen: SeleccionResumen;
  seleccionesResumen: SeleccionResumen [] = [];
  necesidadResumen: NecesidadResumen;
  rolesSeleccionados: string[] = [];
  codigoRolesSeleccionados: string[] = [];
  tieneProyectosFinalizados = false;
  estaSeleccionado = false;
  usuarioId = 0;
  proyectoId = 0;
  necesidadActualResumen: NecesidadResumen;
  necesidadActualId = 0;
  authorities: string[] = [];
  p = 1;

  constructor(private tokenService: TokenService,
              private proyectosService: ProyectosService,
              private proyectoService: ProyectoService,
              private router: Router,
              private rolesService: RolesService) {}

  ngOnInit(): void {
    this.tokenService.actualizarToken();

    this.obtenerAuthorities();

    this.consultarSelecciones();
    this.filtrarMenu();
  }

  obtenerAuthorities(): void {
    const token = window.sessionStorage.getItem('Authorization');
    const tokenPayload = JSON.parse(atob(token.split('.')[1]));
    this.usuarioId = tokenPayload.id;
    this.authorities = tokenPayload.authorities.split(',');
  }

  consultarSelecciones(): void {
    this.proyectosService.consultarSeleccionesPorUsuarioId(this.usuarioId).subscribe((response) => {
      this.seleccionesResumen = response;

      if(this.seleccionesResumen.length > 0) {
        this.seleccionesResumen.forEach(seleccion => {
          this.obtenerProyecto(seleccion.proyectoID, seleccion);
        });
      }
    });
  }

  obtenerProyecto(id: number, seleccion: SeleccionResumen): void {
    this.proyectoService.consultarProyectoPorId(id).subscribe((response) => {
      const unProyecto = response;

      if(unProyecto?.estado?.nombre === 'Finalizado') {
        this.tieneProyectosFinalizados = true;
        this.proyectosResumen.push(unProyecto);
      } else {
        this.seleccionResumen = seleccion;
        this.proyectoResumen = unProyecto;

        this.seleccionResumen.roles.forEach(rol => {
          this.rolesSeleccionados.push(this.rolesService.obtenerNombreDelRol(rol));
        });
      }
    });
  }

  abrirPerfilProyecto(id: number): void {
    this.proyectosService.consultarNecesidadPorProyectoId(id).subscribe((response) => {
      const navigationExtras: NavigationExtras = {
        state: {
          id: response?.id
        }
      };

      this.router.navigate(['/proyecto'], navigationExtras);
    });

  }

  obtenerIdModalDescripcion(id: number): string {
    return 'descripcionModal' + id;
  }

  filtrarMenu(): void {
    this.authorities.forEach(authority => {
      if (authority === 'ROLE_SELECCIONADO') {
        this.estaSeleccionado = true;
      }
    });
  }
}
