import { Component, OnInit } from '@angular/core';
import { PostulacionResumen } from 'src/app/feature/proyectos/shared/model/postulacion-resumen.model';
import { ProyectoResumen } from 'src/app/feature/proyectos/shared/model/proyecto-resumen.model';
import { AdministradorService } from '../../shared/service/administrador.service';

@Component({
  selector: 'app-postulaciones-proyecto',
  templateUrl: './postulaciones-proyecto.component.html',
  styleUrls: ['./postulaciones-proyecto.component.scss']
})
export class PostulacionesProyectoComponent implements OnInit {
  proyectoId = 0;
  hayUsuariosPostulados = false;
  postulacionesResumen: PostulacionResumen[] = [];
  proyecto: ProyectoResumen;
  rolesMapa: Map<string, string> = new Map();

  constructor(private administradorService: AdministradorService) { }

  ngOnInit(): void {
    const params = history.state;
    this.proyectoId = params.id;

    this.cargarMapa();
    this.consultarProyectoPorId();
    this.consultarPostulacionesPorProyectoId();
  }

  cargarMapa(): void {
    this.rolesMapa.set('ROLE_DIRECTOR_PROYECTO', 'Director de Proyecto');
    this.rolesMapa.set('ROLE_PARTE_INTERESADA', 'Parte Interesada');
    this.rolesMapa.set('ROLE_EQUIPO_DESARROLLO', 'Equipo de Desarrollo');
    this.rolesMapa.set('ROLE_INGENIERIA', 'Ingeniería');
    this.rolesMapa.set('ROLE_ARQUITECTURA', 'Arquitectura');
    this.rolesMapa.set('ROLE_ANALISTA', 'Analista');
    this.rolesMapa.set('ROLE_LIDER_DE_EQUIPO', 'Lider de Equipo');
    this.rolesMapa.set('ROLE_PATROCINADOR', 'Patrocinador');
  }

  consultarProyectoPorId(): void {
    this.administradorService.consultarProyectoPorId(this.proyectoId).subscribe((response) => {
      this.proyecto = response;
    });
  }

  consultarPostulacionesPorProyectoId(): void {
    this.administradorService.consultarPostulacionesPorProyectoId(this.proyectoId).subscribe((response) => {
      this.postulacionesResumen = response;

      if(this.postulacionesResumen.length > 0) {
        this.hayUsuariosPostulados = true;
      }
    });
  }

  obtenerNombreDelUsuario(id: number): string {
    return ''+id;
  }

  obtenerCorreoDelUsuario(id: number): string {
    return ''+id;
  }

  obtenerNombreDelRol(clave: string): string {
    return this.rolesMapa.get(clave);
  }

  abrirPerfilUsuario(id: number): void {
    console.log(id);
  }

  seleccionarUsuario(id: number): void {
    console.log(id);
  }

  rechazarUsuario(id: number): void {
    console.log(id);
  }
}
