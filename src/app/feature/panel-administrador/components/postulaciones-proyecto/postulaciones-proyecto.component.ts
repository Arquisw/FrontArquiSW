import { Component, OnInit } from '@angular/core';
import { PostulacionResumen } from 'src/app/feature/proyectos/shared/model/postulacion-resumen.model';
import { ProyectoResumen } from 'src/app/feature/proyectos/shared/model/proyecto-resumen.model';
import { AdministradorService } from '../../shared/service/administrador.service';
import { NavigationExtras, Router } from '@angular/router';
import Modal from 'bootstrap/js/dist/modal';
import { Seleccion } from '../../shared/model/seleccion.model';
import { FormControl, FormGroup } from '@angular/forms';
import { MotivoRechazoPostulacion } from '../../shared/model/motivo-rechazo-postulacion.module';

@Component({
  selector: 'app-postulaciones-proyecto',
  templateUrl: './postulaciones-proyecto.component.html',
  styleUrls: ['./postulaciones-proyecto.component.scss']
})
export class PostulacionesProyectoComponent implements OnInit {
  seleccionModal: Modal | undefined;
  rechazarModal: Modal | undefined;
  proyectoId = 0;
  hayUsuariosPostulados = false;
  postulacionesResumen: PostulacionResumen[] = [];
  postulacionActual: PostulacionResumen;
  proyecto: ProyectoResumen;
  rolesSeleccionados: string[] = [];
  codigoRolesSeleccionados: string[] = [];
  rolesMapa: Map<string, string> = new Map();
  seleccionError = false;
  mensajeError = '';
  rechazarPostulacionForm: FormGroup;
  rechazoError = false;

  constructor(private router: Router, private administradorService: AdministradorService) { }

  ngOnInit(): void {
    const params = history.state;
    this.proyectoId = params.id;

    this.rechazarPostulacionForm = new FormGroup({
      motivoRechazoPostulacion: new FormControl('')
    });

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
    this.seleccionModal = new Modal(document.getElementById('select') ?? false, {
      keyboard: false
    });

    this.seleccionModal?.show();

    this.postulacionActual = this.postulacionesResumen.find(postulacion => postulacion.id === id);
    this.codigoRolesSeleccionados = this.postulacionActual.roles;
    this.codigoRolesSeleccionados.forEach(codigoRol => {
      this.rolesSeleccionados.push(this.rolesMapa.get(codigoRol));
    });
  }

  cerrarModal(): void {
    this.postulacionActual = new PostulacionResumen();
    this.codigoRolesSeleccionados = [];
    this.rolesSeleccionados = [];

    window.location.reload();
  }

  rechazarUsuario(id: number): void {
    this.rechazarModal = new Modal(document.getElementById('decline') ?? false, {
      keyboard: false
    });

    this.rechazarModal?.show();

    this.postulacionActual = this.postulacionesResumen.find(postulacion => postulacion.id === id);
    this.codigoRolesSeleccionados = this.postulacionActual.roles;
    this.codigoRolesSeleccionados.forEach(codigoRol => {
      this.rolesSeleccionados.push(this.rolesMapa.get(codigoRol));
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

  onClickSelect(id: number): void {
    if (this.codigoRolesSeleccionados.length > 0) {

      const postulacion = new Seleccion(this.codigoRolesSeleccionados);

      this.administradorService.seleccionarUsuario(postulacion, id).subscribe((response) => {
        console.log(response);
        this.seleccionModal?.hide();
        window.location.reload();
      }, (error) => {
        this.seleccionError = true;
        this.mensajeError = error?.error?.mensaje;
      });
    } else {
      this.mensajeError = 'Debes seleccionar por lo menos un rol para seleccionar un usuario';
      this.seleccionError = true;
    }
  }

  onDeclineSelect(id: number): void {
    const motivoRechazo = new MotivoRechazoPostulacion(this.rechazarPostulacionForm.get('motivoRechazoPostulacion')?.value);

    this.administradorService.rechazarUsuario(motivoRechazo, id).subscribe(() => {
      this.rechazarModal?.hide();
      window.location.reload();
    }, (error) => {
      this.rechazoError = true;
      this.mensajeError = error?.error?.mensaje;
    });
  }
}
