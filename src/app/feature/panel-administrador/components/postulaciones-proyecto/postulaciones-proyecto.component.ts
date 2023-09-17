import { Component, OnInit } from '@angular/core';
import { PostulacionResumen } from 'src/app/feature/proyectos/shared/model/postulacion-resumen.model';
import { ProyectoResumen } from 'src/app/feature/proyectos/shared/model/proyecto-resumen.model';
import { AdministradorService } from '../../shared/service/administrador.service';
import { NavigationExtras, Router } from '@angular/router';
import Modal from 'bootstrap/js/dist/modal';
import { Seleccion } from '../../shared/model/seleccion.model';
import { MotivoRechazoPostulacion } from '../../shared/model/motivo-rechazo-postulacion.module';

@Component({
  selector: 'app-postulaciones-proyecto',
  templateUrl: './postulaciones-proyecto.component.html',
  styleUrls: ['./postulaciones-proyecto.component.scss']
})
export class PostulacionesProyectoComponent implements OnInit {
  seleccionModal: Modal | undefined;
  proyectoId = 0;
  hayUsuariosPostulados = false;
  estaCargandoSeleccionar = false;
  estaCargandoDeclinar : boolean[] = []; ;
  postulacionesResumen: PostulacionResumen[] = [];
  postulacionActual: PostulacionResumen;
  proyecto: ProyectoResumen;
  codigoRolesSeleccionados: string[] = [];
  rolesMapa: Map<string, string> = new Map();
  seleccionError = false;
  mensajeError = '';
   rolesDisponibles = [];
  rolesSeleccionados = [];
  dropdownSettings = {};

  constructor(private router: Router, private administradorService: AdministradorService) { 
    this.postulacionesResumen.forEach(() => this.estaCargandoDeclinar.push(false));

  }

  ngOnInit(): void {
    const params = history.state;
    this.proyectoId = params.id;

    this.cargarMapa();
    this.consultarProyectoPorId();
    this.consultarPostulacionesPorProyectoId();
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

      if (this.postulacionesResumen.length > 0) {
        this.hayUsuariosPostulados = true;
      }
    });
  }

  obtenerNombreDelRol(clave: string): string {
    return this.rolesMapa.get(clave);
  }

  abrirPerfilUsuario(id: number): void {
    const navigationExtras: NavigationExtras = {
      state: {
        id: id,
        usuario: null,
      }
    };
    this.router.navigate(['/perfil'], navigationExtras);
  }

  seleccionarUsuario(id: number): void {
    this.codigoRolesSeleccionados = [];
    this.postulacionActual = this.postulacionesResumen.find(postulacion => postulacion.id === id);
    this.codigoRolesSeleccionados = this.postulacionActual.roles;
    
    this.codigoRolesSeleccionados.forEach(codigoRol => {
      const rolEncontrado = this.rolesSeleccionados.find(item => item.rolCodigo === codigoRol);
      if(!rolEncontrado){
        this.rolesSeleccionados = this.rolesSeleccionados.concat({ rolCodigo: codigoRol, rol: this.rolesMapa.get(codigoRol) });
      }
    });
    this.seleccionModal = new Modal(document.getElementById('select') ?? false, {
      keyboard: false
    });
    this.seleccionModal?.show();
  }

  cerrarModal(): void {
    this.postulacionActual = new PostulacionResumen();
    this.codigoRolesSeleccionados = [];
    this.rolesSeleccionados = [];

    window.location.reload();
  }



  onClickSelect(id: number): void {
    this.estaCargandoSeleccionar = true;

    if (this.rolesSeleccionados.length > 0) {
      this.codigoRolesSeleccionados=[];
      this.rolesSeleccionados.forEach(rol => {
        this.codigoRolesSeleccionados.push(rol.rolCodigo)
      });
      const postulacion = new Seleccion(this.codigoRolesSeleccionados);

      this.administradorService.seleccionarUsuario(postulacion, id).subscribe((response) => {
        console.log(response);
        this.seleccionModal?.hide();
        window.location.reload();
      }, (error) => {
        this.estaCargandoSeleccionar = false;
        this.seleccionError = true;
        this.mensajeError = error?.error?.mensaje;
      });
    } else {
      this.estaCargandoSeleccionar = false;
      this.mensajeError = 'Debes seleccionar por lo menos un rol para seleccionar un usuario';
      this.seleccionError = true;
    }
  }

  onDeclineSelect(motivoDeclinacion: string, id: number,index:number): void {
    this.estaCargandoDeclinar[index] = true;
    const motivoRechazo = new MotivoRechazoPostulacion(motivoDeclinacion);

    this.administradorService.rechazarUsuario(motivoRechazo, id).subscribe(() => {
      window.location.reload();
    }, (error) => {
      this.estaCargandoDeclinar[index] = false;
      this.mensajeError = error?.error?.mensaje;
    });
  }

  obtenerIdModalRechazo(id: number): string {
    return 'rechazoModal' + id;
  }

  
}
