import { Component, OnInit } from '@angular/core';
import Modal from 'bootstrap/js/dist/modal';
import { ProyectosService } from '../../shared/service/proyectos.service';
import { NecesidadResumen } from '../../../../shared/model/proyecto/necesidad-resumen.model';
import { Postulacion } from '../../shared/model/postulacion.model';
import { PostulacionResumen } from '../../shared/model/postulacion-resumen.model';
import { Router, NavigationExtras } from '@angular/router';
import { ProyectoService } from '@shared/service/proyecto/proyecto.service';
import { RolesService } from '@shared/service/roles/roles.service';
import { TokenService } from '@shared/service/token/token.service';

@Component({
  selector: 'app-consultar-proyectos',
  templateUrl: './consultar-proyectos.component.html',
  styleUrls: ['./consultar-proyectos.component.scss']
})
export class ConsultarProyectosComponent implements OnInit {
  filterTerm!: string;
  necesidades: NecesidadResumen[] = [];
  postulacionResumen: PostulacionResumen;
  postulacionesResumen: PostulacionResumen[];
  correo = '';
  loginModal: Modal | undefined;
  codigoRolesSeleccionados: string[] = [];
  postulacionError = false;
  mensajeError = '';
  usuarioId = 0;
  proyectoActualId = 0;
  mostrarBotonPostulacion = true;
  hayNecesidades = false;
  estaCargandoPostulacion = false;
  authorities: string[] = [];
  p = 1;
  rolesDisponibles = [];
  rolesSeleccionados = [];
  dropdownSettings = {};

  constructor(private tokenService: TokenService,
              private proyectosService: ProyectosService,
              private proyectoService: ProyectoService,
              private router: Router,
              private rolesService: RolesService) { }

  ngOnInit(): void {
    this.tokenService.actualizarToken();
    
    const token = window.sessionStorage.getItem('Authorization');
    const tokenPayload = JSON.parse(atob(token.split('.')[1]));
    this.usuarioId = tokenPayload.id;
    this.authorities = tokenPayload.authorities.split(',');

    this.filtrarBotonPostulacion();

    this.consultarProyectosNegociados();

    this.consultarPostulacionesPorUsuarioId();
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

  filtrarBotonPostulacion(): void {

    this.authorities.forEach(authority => {

      if (authority === 'ROLE_ASOCIACION') {
        this.mostrarBotonPostulacion = false;
      }

      if (authority === 'ROLE_POSTULADO') {
        this.mostrarBotonPostulacion = false;
      }

      if (authority === 'ROLE_SELECCIONADO') {
        this.mostrarBotonPostulacion = false;
      }

      if (authority === 'ROLE_ADMINISTRADOR') {
        this.mostrarBotonPostulacion = false;
      }
    });
  }

  consultarPostulacionesPorUsuarioId(): void {
    this.proyectosService.consultarPostulacionesPorUsuarioId(this.usuarioId).subscribe((response) => {
      this.postulacionesResumen = response;

      if (this.postulacionesResumen.length > 0) {
        this.postulacionesResumen.forEach(postulacion => {
          if (postulacion.proyectoID === this.proyectoActualId) {
            this.postulacionResumen = postulacion;
          }
        });
      }
    });
  }

  consultarProyectosNegociados(): void {
    this.proyectoService.consultarProyectosNegociados().subscribe((response) => {
      this.necesidades = response;

      if (this.necesidades.length > 0) {
        this.hayNecesidades = true;
      }
    });
  }

  openPostularse(id: number): void {
    this.proyectoActualId = id;

    this.loginModal = new Modal(document.getElementById('postuleProject') ?? false, {
      keyboard: false
    });

    this.loginModal?.show();

    this.rolesSeleccionados = [];
    this.codigoRolesSeleccionados = [];
  }

  onClickPostule(): void {
    this.estaCargandoPostulacion = true;

    if(this.rolesSeleccionados.length > 0) {
      this.codigoRolesSeleccionados =[];
      this.rolesSeleccionados.forEach(rol => {
        this.codigoRolesSeleccionados.push(rol.rolCodigo);
      });
      const postulacion = new Postulacion(this.codigoRolesSeleccionados, this.proyectoActualId, this.usuarioId);

      this.proyectosService.guardarPostulacion(postulacion).subscribe((response) => {
        console.log('Data:', response);
        this.loginModal?.hide();
        window.location.reload();
      }, (error) => {
        this.estaCargandoPostulacion = false;
        this.postulacionError = true;
        this.mensajeError = error?.error?.mensaje;
      });
    } else {
      this.estaCargandoPostulacion = false;
      this.mensajeError = 'Debes seleccionar por lo menos un rol al cual postularse.';
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
}
