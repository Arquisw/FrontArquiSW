import { Component, OnInit } from '@angular/core';
import { NecesidadResumen } from '../../shared/model/necesidad-resumen.model';
import { ProyectoResumen } from '../../shared/model/proyecto-resumen.model';
import { SeleccionResumen } from '../../shared/model/seleccion-resumen.model';
import { ProyectosService } from '../../shared/service/proyectos.service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-consultar-proyectos-seleccionados',
  templateUrl: './consultar-proyectos-seleccionados.component.html',
  styleUrls: ['./consultar-proyectos-seleccionados.component.scss']
})
export class ConsultarProyectosSeleccionadosComponent implements OnInit {
  proyectoResumen: ProyectoResumen;
  proyectosResumen: ProyectoResumen[];
  seleccionResumen: SeleccionResumen;
  seleccionesResumen: SeleccionResumen [] = [];
  necesidadResumen: NecesidadResumen;
  rolesSeleccionados: string[] = [];
  codigoRolesSeleccionados: string[] = [];
  tieneMasDeUnaSeleccion = false;
  roles: Map<string, string> = new Map();
  estaSeleccionado = false;
  usuarioId = 0;
  proyectoId = 0;
  necesidadActualResumen: NecesidadResumen;
  necesidadActualId = 0;
  p = 1;

  constructor(private proyectosService: ProyectosService, private router: Router) {}

  ngOnInit(): void {
    const token = window.sessionStorage.getItem('Authorization');
    const tokenPayload = JSON.parse(atob(token.split('.')[1]));
    this.usuarioId = tokenPayload.id;

    this.cargarMapaDeRoles();
    this.consultarSelecciones();
  }

  cargarMapaDeRoles(): void {
    this.roles.set('ROLE_DIRECTOR_PROYECTO', 'Director de Proyecto');
    this.roles.set('ROLE_PARTE_INTERESADA', 'Parte Interesada');
    this.roles.set('ROLE_EQUIPO_DESARROLLO', 'Equipo de Desarrollo');
    this.roles.set('ROLE_INGENIERIA', 'Ingenieria');
    this.roles.set('ROLE_ARQUITECTURA', 'Arquitectura');
    this.roles.set('ROLE_ANALISTA', 'Analista');
    this.roles.set('ROLE_LIDER_DE_EQUIPO', 'Lider del Equipo');
    this.roles.set('ROLE_PATROCINADOR', 'Patrocinador');
  }

  consultarSelecciones(): void {
    this.proyectosService.consultarSeleccionesPorUsuarioId(this.usuarioId).subscribe((response) => {
      this.seleccionesResumen = response;

      if(this.seleccionesResumen.length > 0) {
        if(this.seleccionesResumen.length > 1) {
          this.tieneMasDeUnaSeleccion = true;
        }

        this.seleccionesResumen.slice(1).forEach(seleccion => {
          this.obtenerProyecto(seleccion.proyectoID);
        });

        this.seleccionResumen = this.seleccionesResumen[0];

        this.seleccionResumen.roles.forEach(rol => {
          this.rolesSeleccionados.push(this.roles.get(rol));
        });

        this.estaSeleccionado = true;
        this.consultarProyecto();
      } else {
        this.estaSeleccionado = false;
      }
    });
  }

  obtenerProyecto(id: number): void {
    this.proyectosService.consultarProyectoPorId(id).subscribe((response) => {
      this.proyectosResumen.push(response);

      this.consultarNecesidad();
    });
  }

  consultarProyecto(): void {
    this.proyectosService.consultarProyectoPorId(this.seleccionResumen.proyectoID).subscribe((response) => {

      this.proyectoResumen = response;

      this.consultarNecesidad();
    });
  }

  consultarNecesidad(): void {
    this.proyectosService.consultarNecesidadPorProyectoId(this.proyectoResumen.id).subscribe((response) => {
      this.necesidadResumen = response;
    });
  }

  abrirPerfilProyecto(): void {
    const navigationExtras: NavigationExtras = {
      state: {
        id: this.necesidadResumen.id
      }
    };

    this.router.navigate(['/proyecto'], navigationExtras);
  }

  obtenerIdModalDescripcion(id: number): string {
    return 'descripcionModal' + id;
  }
}
