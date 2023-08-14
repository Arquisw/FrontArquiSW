import { Component, OnInit } from '@angular/core';
import Modal from 'bootstrap/js/dist/modal';
import { ProyectoResumen } from '../../shared/model/proyecto-resumen.model';
import { PostulacionResumen } from '../../shared/model/postulacion-resumen.model';
import { ProyectosService } from '../../shared/service/proyectos.service';
import { Postulacion } from '../../shared/model/postulacion.model';
import { NecesidadResumen } from '../../shared/model/necesidad-resumen.model';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-consultar-proyecto-postulado',
  templateUrl: './consultar-proyecto-postulado.component.html',
  styleUrls: ['./consultar-proyecto-postulado.component.scss']
})
export class ConsultarProyectoPostuladoComponent implements OnInit {
  loginModal: Modal | undefined;
  proyectoResumen: ProyectoResumen;
  proyectosResumen: ProyectoResumen[];
  postulacionResumen: PostulacionResumen;
  postulacionesResumen: PostulacionResumen[] = [];
  necesidadResumen: NecesidadResumen;
  rolesSeleccionados: string[] = [];
  codigoRolesSeleccionados: string[] = [];
  roles: Map<string, string> = new Map();
  estaPostulado = false;
  postulacionError = false;
  tieneMasDeUnaPostulacion = false;
  mensajeError = '';
  usuarioId = 0;
  proyectoId = 0;

  constructor(private proyectosService: ProyectosService, private router: Router) { }

  ngOnInit(): void {
    const token = window.sessionStorage.getItem('Authorization');
    const tokenPayload = JSON.parse(atob(token.split('.')[1]));
    this.usuarioId = tokenPayload.id;

    this.cargarMapaDeRoles();
    this.consultarPostulaciones();
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

  openActualizarPostulacionModal(): void {
    this.loginModal = new Modal(document.getElementById('updatePostulation') ?? false, {
      keyboard: false
    });

    this.loginModal?.show();
  }

  cerrarModal(): void {
    window.location.reload();
  }

  consultarPostulaciones(): void {
    this.proyectosService.consultarPostulacionesPorUsuarioId(this.usuarioId).subscribe((response) => {
      console.log('Data:', response);

      this.postulacionesResumen = response;

      if(this.postulacionesResumen.length > 1) {
        this.tieneMasDeUnaPostulacion = true;
      }

      this.postulacionesResumen.forEach(postulacion => {
        if(postulacion.rechazado) {
          this.obtenerProyecto(postulacion.proyectoID);
        }
      });

      this.postulacionesResumen.forEach(postulacion => {
        if(!postulacion.seleccionado && !postulacion.rechazado) {
          this.postulacionResumen = postulacion;
        }
      });

      this.postulacionResumen.roles.forEach(rol => {
        this.rolesSeleccionados.push(this.roles.get(rol));
      });

      this.estaPostulado = true;
      this.consultarProyecto();
    }, (error) => {
      this.postulacionError = true;
      this.estaPostulado = false;
      this.mensajeError = error?.error?.mensaje;
    });
  }

  obtenerProyecto(id: number): void {
    this.proyectosService.consultarProyectoPorId(id).subscribe((response) => {
      this.proyectosResumen.push(response);
    });
  }

  consultarProyecto(): void {
    this.proyectosService.consultarProyectoPorId(this.postulacionResumen.proyectoID).subscribe((response) => {
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

  onDirectorDeProyectoSelected(): void {
    const rol = 'Director de Proyecto';
    const rolCodigo = 'ROLE_DIRECTOR_PROYECTO';

    if (this.rolesSeleccionados.includes(rol)) {
      const index = this.rolesSeleccionados.indexOf(rol);
      const indexCode = this.codigoRolesSeleccionados.indexOf(rolCodigo);

      this.rolesSeleccionados.splice(index);
      this.codigoRolesSeleccionados.splice(indexCode);
    } else {
      this.rolesSeleccionados.push(rol);
      this.codigoRolesSeleccionados.push(rolCodigo);
    }
  }

  onParteInteresadaSelected(): void {
    const rol = 'Parte Interesada';
    const rolCodigo = 'ROLE_PARTE_INTERESADA';

    if (this.rolesSeleccionados.includes(rol)) {
      const index = this.rolesSeleccionados.indexOf(rol);
      const indexCode = this.codigoRolesSeleccionados.indexOf(rolCodigo);

      this.rolesSeleccionados.splice(index);
      this.codigoRolesSeleccionados.splice(indexCode);
    } else {
      this.rolesSeleccionados.push(rol);
      this.codigoRolesSeleccionados.push(rolCodigo);
    }
  }

  onEquipoDeDesarrolloSelected(): void {
    const rol = 'Equipo de Desarrollo';
    const rolCodigo = 'ROLE_EQUIPO_DESARROLLO';

    if (this.rolesSeleccionados.includes(rol)) {
      const index = this.rolesSeleccionados.indexOf(rol);
      const indexCode = this.codigoRolesSeleccionados.indexOf(rolCodigo);

      this.rolesSeleccionados.splice(index);
      this.codigoRolesSeleccionados.splice(indexCode);
    } else {
      this.rolesSeleccionados.push(rol);
      this.codigoRolesSeleccionados.push(rolCodigo);
    }
  }

  onIngenieriaSelected(): void {
    const rol = 'Ingenieria';
    const rolCodigo = 'ROLE_INGENIERIA';

    if (this.rolesSeleccionados.includes(rol)) {
      const index = this.rolesSeleccionados.indexOf(rol);
      const indexCode = this.codigoRolesSeleccionados.indexOf(rolCodigo);

      this.rolesSeleccionados.splice(index);
      this.codigoRolesSeleccionados.splice(indexCode);
    } else {
      this.rolesSeleccionados.push(rol);
      this.codigoRolesSeleccionados.push(rolCodigo);
    }
  }

  onArquitecturaSelected(): void {
    const rol = 'Arquitectura';
    const rolCodigo = 'ROLE_ARQUITECTURA';

    if (this.rolesSeleccionados.includes(rol)) {
      const index = this.rolesSeleccionados.indexOf(rol);
      const indexCode = this.codigoRolesSeleccionados.indexOf(rolCodigo);

      this.rolesSeleccionados.splice(index);
      this.codigoRolesSeleccionados.splice(indexCode);
    } else {
      this.rolesSeleccionados.push(rol);
      this.codigoRolesSeleccionados.push(rolCodigo);
    }
  }

  onAnalistaSelected(): void {
    const rol = 'Analista';
    const rolCodigo = 'ROLE_ANALISTA';

    if (this.rolesSeleccionados.includes(rol)) {
      const index = this.rolesSeleccionados.indexOf(rol);
      const indexCode = this.codigoRolesSeleccionados.indexOf(rolCodigo);

      this.rolesSeleccionados.splice(index);
      this.codigoRolesSeleccionados.splice(indexCode);
    } else {
      this.rolesSeleccionados.push(rol);
      this.codigoRolesSeleccionados.push(rolCodigo);
    }
  }

  onLiderDelEquipoSelected(): void {
    const rol = 'Lider del Equipo';
    const rolCodigo = 'ROLE_LIDER_DE_EQUIPO';

    if (this.rolesSeleccionados.includes(rol)) {
      const index = this.rolesSeleccionados.indexOf(rol);
      const indexCode = this.codigoRolesSeleccionados.indexOf(rolCodigo);

      this.rolesSeleccionados.splice(index);
      this.codigoRolesSeleccionados.splice(indexCode);
    } else {
      this.rolesSeleccionados.push(rol);
      this.codigoRolesSeleccionados.push(rolCodigo);
    }
  }

  onPatrocinadorSelected(): void {
    const rol = 'Patrocinador';
    const rolCodigo = 'ROLE_PATROCINADOR';

    if (this.rolesSeleccionados.includes(rol)) {
      const index = this.rolesSeleccionados.indexOf(rol);
      const indexCode = this.codigoRolesSeleccionados.indexOf(rolCodigo);

      this.rolesSeleccionados.splice(index);
      this.codigoRolesSeleccionados.splice(indexCode);
    } else {
      this.rolesSeleccionados.push(rol);
      this.codigoRolesSeleccionados.push(rolCodigo);
    }
  }

  onClickUpdatePostulation(): void {
    if (this.codigoRolesSeleccionados.length > 0) {

      const postulacion = new Postulacion(this.codigoRolesSeleccionados, this.postulacionResumen.proyectoID, this.postulacionResumen.usuarioID);

      this.proyectosService.actualizarPostulacion(postulacion, this.postulacionResumen.id).subscribe((response) => {
        console.log('Data:', response);
        this.loginModal?.hide();
        window.location.reload();
      }, (error) => {
        this.postulacionError = true;
        this.mensajeError = error?.error?.mensaje;
      });
    } else {
      this.mensajeError = 'Debes seleccionar por lo menos un rol al cual postularse';
    }
  }

  abrirPerfilProyecto(id): void {
    const idActual = this.obtenerNecesidadIdPorProyectoId(id);

    const navigationExtras: NavigationExtras = {
      state: {
        id: idActual
      }
    };
    
    this.router.navigate(['/proyecto'], navigationExtras);
  }

  obtenerNecesidadIdPorProyectoId(id: number): number {
    let necesidadId = 0;

    this.proyectosService.consultarNecesidadPorProyectoId(id).subscribe((response) => {
      necesidadId = response.id;
    });

    return necesidadId;
  }
}
