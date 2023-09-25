import { Component, OnInit } from '@angular/core';
import Modal from 'bootstrap/js/dist/modal';
import { ProyectoResumen } from '../../shared/model/proyecto-resumen.model';
import { PostulacionResumen } from '../../shared/model/postulacion-resumen.model';
import { ProyectosService } from '../../shared/service/proyectos.service';
import { Postulacion } from '../../shared/model/postulacion.model';
import { NecesidadResumen } from '../../shared/model/necesidad-resumen.model';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-consultar-proyectos-postulados',
  templateUrl: './consultar-proyectos-postulados.component.html',
  styleUrls: ['./consultar-proyectos-postulados.component.scss']
})
export class ConsultarProyectosPostuladosComponent implements OnInit {
  loginModal: Modal | undefined;
  proyectoResumen: ProyectoResumen;
  proyectosResumen: ProyectoResumen[] = [];
  postulacionResumen: PostulacionResumen = null;
  postulacionesResumen: PostulacionResumen[] = [];
  proyectosPostulacionesRechazadas: number[] = [];
  necesidadResumen: NecesidadResumen;
  codigoRolesSeleccionados: string[] = [];
  roles: Map<string, string> = new Map();
  estaPostulado = false;
  postulacionError = false;
  tieneMasDeUnaPostulacion = false;
  tieneMotivoRechazo = false;
  estaCargandoPostulacion = false;
  mensajeError = '';
  usuarioId = 0;
  proyectoId = 0;
  rolesDisponibles = [];
  rolesSeleccionados = [];
  rolesDeSeleccionados = [];
  dropdownSettings = {};
  p = 1;

  constructor(private proyectosService: ProyectosService, private router: Router) { }

  ngOnInit(): void {
    const token = window.sessionStorage.getItem('Authorization');
    const tokenPayload = JSON.parse(atob(token.split('.')[1]));
    this.usuarioId = tokenPayload.id;

    this.cargarMapaDeRoles();
    this.consultarPostulaciones();

    this.rolesDisponibles = [
      { rolCodigo: 'ROLE_DIRECTOR_PROYECTO', rol: 'Director de Proyecto' },
      { rolCodigo: 'ROLE_PARTE_INTERESADA', rol: 'Parte Interesada' },
      { rolCodigo: 'ROLE_EQUIPO_DESARROLLO', rol: 'Equipo de Desarrollo' },
      { rolCodigo: 'ROLE_INGENIERIA', rol: 'Ingeniería' },
      { rolCodigo: 'ROLE_ARQUITECTURA', rol: 'Arquitectura' },
      { rolCodigo: 'ROLE_ANALISTA', rol: 'Analista' },
      { rolCodigo: 'ROLE_LIDER_DE_EQUIPO', rol: 'Lider de Equipo' },
      { rolCodigo: 'ROLE_PATROCINADOR', rol: 'Patrocinador' }
    ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'rolCodigo',
      textField: 'rol',
      allowSearchFilter: false,
      enableCheckAll: false
    };
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
      this.postulacionesResumen = response;

      if(this.postulacionesResumen.length > 0) {
        if(this.postulacionesResumen.length > 1) {
          this.tieneMasDeUnaPostulacion = true;
        }

        this.postulacionesResumen.forEach(postulacion => {
          if(!postulacion.seleccionado && !postulacion.rechazado) {
            this.postulacionResumen = postulacion;
            const index = this.postulacionesResumen.indexOf(postulacion);

            this.postulacionesResumen.splice(index);
          }

          if(postulacion.seleccionado) {
            this.tieneMasDeUnaPostulacion = false;
          } else if(postulacion.rechazado) {
            this.tieneMasDeUnaPostulacion = true;
            this.proyectosPostulacionesRechazadas.push(postulacion?.proyectoID);
          }
        });

        if(this.postulacionResumen !== null) {
          this.postulacionResumen.roles.forEach(codigoRol => {
            this.rolesSeleccionados.push(this.roles.get(codigoRol));
            const rolEncontrado = this.rolesDeSeleccionados.find(item => item.rolCodigo === codigoRol);
            if(!rolEncontrado){
              this.rolesDeSeleccionados = this.rolesDeSeleccionados.concat({ rolCodigo: codigoRol, rol: this.roles.get(codigoRol) });
            }
          });
          this.consultarProyecto();

          this.estaPostulado = true;
        }

        if(this.proyectosPostulacionesRechazadas.length > 0) {
          this.obtenerProyectos();
        }
      } else {
        this.estaPostulado = false;
      }
    });
  }

  obtenerProyectos(): void {
    this.proyectosPostulacionesRechazadas.forEach(id => {
      this.proyectosService.consultarProyectoPorId(id).subscribe((response) => {
        const unProyecto = response;

        if(unProyecto !== null || unProyecto != undefined) {
          this.proyectosResumen.push(unProyecto);
        }
      });
    });
  }

  consultarProyecto(): void {
    this.proyectosService.consultarProyectoPorId(this.postulacionResumen?.proyectoID).subscribe((response) => {
      this.proyectoResumen = response;

      this.consultarNecesidad();
    });
  }

  consultarNecesidad(): void {
    this.proyectosService.consultarNecesidadPorProyectoId(this.proyectoResumen.id).subscribe((response) => {
      this.necesidadResumen = response;
    });
  }

  obtenerMotivoDeRechazo(id: number): string {
    let motivoDelRechazo = '';

    this.postulacionesResumen.forEach(postulacion => {
      if(postulacion.proyectoID === id && postulacion.motivoDelRechazo !== '') {
        motivoDelRechazo = postulacion.motivoDelRechazo;
        this.tieneMotivoRechazo = true;
      }
    });

    return motivoDelRechazo;
  }

  onClickUpdatePostulation(): void {
    this.estaCargandoPostulacion = true;

    if (this.rolesDeSeleccionados.length > 0) {
      this.codigoRolesSeleccionados = [];

      this.rolesDeSeleccionados.forEach(rol => {
        this.codigoRolesSeleccionados.push(rol.rolCodigo);
      });

      const postulacion = new Postulacion(this.codigoRolesSeleccionados, this.postulacionResumen.proyectoID, this.postulacionResumen.usuarioID);

      this.proyectosService.actualizarPostulacion(postulacion, this.postulacionResumen.id).subscribe(() => {
        this.loginModal?.hide();
        window.location.reload();
      }, (error) => {
        this.estaCargandoPostulacion = false;
        this.postulacionError = true;
        this.mensajeError = error?.error?.mensaje;
      });
    } else {
      this.estaCargandoPostulacion = false;
      this.mensajeError = 'Debes seleccionar por lo menos un rol al cual postularse';
    }
  }

  abrirPerfilProyecto(id): void {
    const navigationExtras: NavigationExtras = {
      state: {
        id: id
      }
    };

    this.router.navigate(['/proyecto'], navigationExtras);
  }

  obtenerIdModalDescripcion(id: number): string {
    return 'descripcionModal' + id;
  }

  obtenerIdModalMotivoRechazo(id: number): string {
    return 'motivoRechazoModal' + id;
  }
}
