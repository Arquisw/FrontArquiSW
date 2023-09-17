import { Component, OnInit } from '@angular/core';
import Modal from 'bootstrap/js/dist/modal';
import { ProyectosService } from '../../shared/service/proyectos.service';
import { NecesidadResumen } from '../../shared/model/necesidad-resumen.model';
import { Postulacion } from '../../shared/model/postulacion.model';
import { PostulacionResumen } from '../../shared/model/postulacion-resumen.model';
import { Router, NavigationExtras } from '@angular/router';

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
  rolesSeleccionados: string[] = [];
  codigoRolesSeleccionados: string[] = [];
  postulacionError = false;
  mensajeError = '';
  usuarioId = 0;
  proyectoActualId = 0;
  mostrarBotonPostulacion = true;
  hayNecesidades = false;
  estaCargandoPostulacion = false;
  authorities: string[] = [];
  p:number = 1;

  constructor(private proyectosService: ProyectosService, private router: Router) { }

  ngOnInit(): void {
    const token = window.sessionStorage.getItem('Authorization');
    const tokenPayload = JSON.parse(atob(token.split('.')[1]));
    this.usuarioId = tokenPayload.id;
    this.authorities = tokenPayload.authorities.split(',');

    this.filtrarBotonPostulacion();

    this.consultarProyectosNegociados();

    this.consultarPostulacionesPorUsuarioId();
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
    this.proyectosService.consultarProyectosNegociados().subscribe((response) => {
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

  onDirectorDeProyectoSelected(): void {
    const rol = 'Director de Proyecto';
    const rolCodigo = 'ROLE_DIRECTOR_PROYECTO';

    if(this.rolesSeleccionados.includes(rol)) {
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

    if(this.rolesSeleccionados.includes(rol)) {
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

    if(this.rolesSeleccionados.includes(rol)) {
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

    if(this.rolesSeleccionados.includes(rol)) {
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

    if(this.rolesSeleccionados.includes(rol)) {
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

    if(this.rolesSeleccionados.includes(rol)) {
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

    if(this.rolesSeleccionados.includes(rol)) {
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

    if(this.rolesSeleccionados.includes(rol)) {
      const index = this.rolesSeleccionados.indexOf(rol);
      const indexCode = this.codigoRolesSeleccionados.indexOf(rolCodigo);

      this.rolesSeleccionados.splice(index);
      this.codigoRolesSeleccionados.splice(indexCode);
    } else {
      this.rolesSeleccionados.push(rol);
      this.codigoRolesSeleccionados.push(rolCodigo);
    }
  }

  onClickPostule(): void {
    this.estaCargandoPostulacion = true;

    if(this.codigoRolesSeleccionados.length > 0) {
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
}
