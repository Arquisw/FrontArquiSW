import { Component, OnInit } from '@angular/core';
import Modal from 'bootstrap/js/dist/modal';
import { ProyectosService } from '../../shared/service/proyectos.service';
import { NecesidadResumen } from '../../shared/model/necesidad-resumen.model';
import { Postulacion } from '../../shared/model/postulacion.model';
import { ConfiguracionService } from 'src/app/feature/configuracion/shared/service/configuracion.service';
import { PersonaResumen } from 'src/app/feature/configuracion/shared/model/persona-resumen.model';
import { UsuarioResumen } from 'src/app/feature/configuracion/shared/model/usuario-resumen.model';
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
  personaResumen: PersonaResumen;
  usuarioResumen: UsuarioResumen;
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

  constructor(private proyectosService: ProyectosService, private configuracionService: ConfiguracionService, private router: Router) { }

  ngOnInit(): void {
    const token = window.sessionStorage.getItem('Authorization');
    const tokenPayload = JSON.parse(atob(token.split('.')[1]));
    this.usuarioId = tokenPayload.id;

    this.consultarPersona();

    this.consultarProyectos();
  }

  consultarPersona(): void {
    this.configuracionService.consultarPersonaPorId(this.usuarioId).subscribe((response) => {
      this.personaResumen = response;
      this.correo = this.personaResumen.correo;
      this.consultarUsuario();
    });
  }

  consultarUsuario(): void {
    this.configuracionService.consultarUsuarioPorCorreo(this.correo).subscribe((response) => {
      this.usuarioResumen = response;
      this.filtrarBotonPostulacion(this.usuarioResumen.roles);
    });
  }

  filtrarBotonPostulacion(roles): void {
    roles.forEach(rol => {
      if (rol.nombre === 'ROLE_ASOCIACION') {
        this.mostrarBotonPostulacion = false;
      }

      if (rol.nombre === 'ROLE_POSTULADO') {
        this.mostrarBotonPostulacion = false;
      }
    });
  }

  consultarPostulacionPorUsuarioId(): void {
    this.proyectosService.consultarPostulacionesPorUsuarioId(this.usuarioId).subscribe((response) => {
      console.log('Data:', response);
      this.postulacionesResumen = response;

      this.postulacionesResumen.forEach(postulacion => {
        if(postulacion.proyectoID === this.proyectoActualId) {
          this.postulacionResumen = postulacion;
        }
      });
    }, (error) => {
      this.mostrarBotonPostulacion = false;
      console.log(error?.error?.mensaje);
    });
  }

  consultarProyectos(): void {
    this.proyectosService.consultarProyectos().subscribe((response) => {
      console.log('Data:', response);
      this.necesidades = response;
    });
  }

  openPostularse(id: number): void {
    this.proyectoActualId = id;

    this.loginModal = new Modal(document.getElementById('postuleProject') ?? false, {
      keyboard: false
    });

    this.loginModal?.show();

    console.log(id);
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

  onClickPostule(): void {
    if (this.codigoRolesSeleccionados.length > 0) {

      const postulacion = new Postulacion(this.codigoRolesSeleccionados, this.proyectoActualId, this.usuarioId);

      this.proyectosService.guardarPostulacion(postulacion).subscribe((response) => {
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
    const navigationExtras: NavigationExtras = {
      state: {
        id: id
      }
    };
    this.router.navigate(['/proyecto'], navigationExtras);
  }
}
