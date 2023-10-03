import { Component, OnInit } from '@angular/core';
import Modal from 'bootstrap/js/dist/modal';
import { PostulacionResumen } from '../../shared/model/postulacion-resumen.model';
import { ProyectosService } from '../../shared/service/proyectos.service';
import { Postulacion } from '../../shared/model/postulacion.model';
import { NecesidadResumen } from '../../../../shared/model/proyecto/necesidad-resumen.model';
import { NavigationExtras, Router } from '@angular/router';
import { ProyectoResumen } from '@shared/model/proyecto/proyecto-resumen.model';
import { ProyectoService } from '@shared/service/proyecto/proyecto.service';
import { RolesService } from '@shared/service/roles/roles.service';

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

  constructor(private proyectosService: ProyectosService,
              private proyectoService: ProyectoService,
              private router: Router,
              private rolesService: RolesService) { }

  ngOnInit(): void {
    const token = window.sessionStorage.getItem('Authorization');
    const tokenPayload = JSON.parse(atob(token.split('.')[1]));
    this.usuarioId = tokenPayload.id;

    this.consultarPostulaciones();

    this.rolesDisponibles = [
      { rolCodigo: 'ROLE_DIRECTOR_PROYECTO', rol: this.rolesService.obtenerNombreDelRol('ROLE_DIRECTOR_PROYECTO') },
      { rolCodigo: 'ROLE_PARTE_INTERESADA', rol: this.rolesService.obtenerNombreDelRol('ROLE_PARTE_INTERESADA') },
      { rolCodigo: 'ROLE_EQUIPO_DESARROLLO', rol: this.rolesService.obtenerNombreDelRol('ROLE_EQUIPO_DESARROLLO') },
      { rolCodigo: 'ROLE_INGENIERIA', rol: this.rolesService.obtenerNombreDelRol('ROLE_INGENIERIA') },
      { rolCodigo: 'ROLE_ARQUITECTURA', rol: this.rolesService.obtenerNombreDelRol('ROLE_ARQUITECTURA') },
      { rolCodigo: 'ROLE_ANALISTA', rol: this.rolesService.obtenerNombreDelRol('ROLE_ANALISTA') },
      { rolCodigo: 'ROLE_LIDER_DE_EQUIPO', rol: this.rolesService.obtenerNombreDelRol('ROLE_LIDER_DE_EQUIPO') },
      { rolCodigo: 'ROLE_PATROCINADOR', rol: this.rolesService.obtenerNombreDelRol('ROLE_PATROCINADOR') }
    ];

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'rolCodigo',
      textField: 'rol',
      allowSearchFilter: false,
      enableCheckAll: false
    };
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
            this.rolesSeleccionados.push(this.rolesService.obtenerNombreDelRol(codigoRol));
            const rolEncontrado = this.rolesDeSeleccionados.find(item => item.rolCodigo === codigoRol);
            if(!rolEncontrado){
              this.rolesDeSeleccionados = this.rolesDeSeleccionados.concat({ rolCodigo: codigoRol, rol: this.rolesService.obtenerNombreDelRol(codigoRol) });
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
      this.proyectoService.consultarProyectoPorId(id).subscribe((response) => {
        const unProyecto = response;

        if(unProyecto !== null || unProyecto != undefined) {
          this.proyectosResumen.push(unProyecto);
        }
      });
    });
  }

  consultarProyecto(): void {
    this.proyectoService.consultarProyectoPorId(this.postulacionResumen?.proyectoID).subscribe((response) => {
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
