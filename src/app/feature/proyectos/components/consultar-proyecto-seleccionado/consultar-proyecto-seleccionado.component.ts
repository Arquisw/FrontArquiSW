import { Component, OnInit } from '@angular/core';
import { NecesidadResumen } from '../../shared/model/necesidad-resumen.model';
import { ProyectoResumen } from '../../shared/model/proyecto-resumen.model';
import { SeleccionResumen } from '../../shared/model/seleccion-resumen.model';
import { ProyectosService } from '../../shared/service/proyectos.service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-consultar-proyecto-seleccionado',
  templateUrl: './consultar-proyecto-seleccionado.component.html',
  styleUrls: ['./consultar-proyecto-seleccionado.component.scss']
})
export class ConsultarProyectoSeleccionadoComponent implements OnInit {
  proyectoResumen: ProyectoResumen;
  seleccionResumen: SeleccionResumen;
  necesidadResumen: NecesidadResumen;
  rolesSeleccionados: string[] = [];
  codigoRolesSeleccionados: string[] = [];
  roles: Map<string, string> = new Map();
  estaSeleccionado = false;
  usuarioId = 0;
  proyectoId = 0;

  constructor(private proyectosService: ProyectosService, private router: Router) {}

  ngOnInit(): void {
    const token = window.sessionStorage.getItem('Authorization');
    const tokenPayload = JSON.parse(atob(token.split('.')[1]));
    this.usuarioId = tokenPayload.id;

    this.cargarMapaDeRoles();
    this.consultarSeleccion();
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

  consultarSeleccion(): void {
    this.proyectosService.consultarSeleccionPorUsuarioId(this.usuarioId).subscribe((response) => {
      console.log('Data:', response);

      this.seleccionResumen = response;

      this.seleccionResumen.roles.forEach(rol => {
        this.rolesSeleccionados.push(this.roles.get(rol));
      });

      this.estaSeleccionado = true;
      this.consultarProyecto();
    }, (error) => {
      this.estaSeleccionado = false;
      console.log(error?.error?.mensaje);
    });
  }

  consultarProyecto(): void {
    this.proyectosService.consultarProyectoPorId(this.seleccionResumen.proyectoID).subscribe((response) => {
      console.log('Data:', response);

      this.proyectoResumen = response;

      this.consultarNecesidad();
    });
  }

  consultarNecesidad(): void {
    this.proyectosService.consultarNecesidadPorProyectoId(this.proyectoResumen.id).subscribe((response) => {
      console.log('Data:', response);

      this.necesidadResumen = response;
    });
  }

  abrirPerfilProyecto(id): void {
    const navigationExtras: NavigationExtras = {
      state: {
        id: id
      }
    };
    this.router.navigate(['/proyecto'], navigationExtras);
  }
}
