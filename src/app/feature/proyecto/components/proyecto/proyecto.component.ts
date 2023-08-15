import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ProyectoService } from '../../shared/service/proyecto.service';
import { NecesidadResumen } from 'src/app/feature/proyectos/shared/model/necesidad-resumen.model';
import { ConfiguracionService } from 'src/app/feature/configuracion/shared/service/configuracion.service';
import { SeleccionResumen } from 'src/app/feature/proyectos/shared/model/seleccion-resumen.model';
import { StorageService } from '@shared/service/storage-service/storage.service';
import { RequerimientosResumen } from 'src/app/feature/proyectos/shared/model/requerimientos-resumen.model';
import { PersonaResumen } from 'src/app/feature/configuracion/shared/model/persona-resumen.model';
import { UsuarioResumen } from 'src/app/feature/configuracion/shared/model/usuario-resumen.model';

@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.scss']
})
export class ProyectoComponent implements OnInit {
  usuarioId: number;
  necesidadId: number;
  proyectoId: number;
  necesidadResumen: NecesidadResumen;
  requerimientosResumen: RequerimientosResumen;
  personaResumen: PersonaResumen;
  usuarioResumen: UsuarioResumen;
  correo: string;
  seleccionesResumen: SeleccionResumen[] = [];
  tieneUsuariosSeleccionados = false;
  tieneServicioIngenieriaDeRequisitos = false;
  tieneServicioSQA = false;
  tieneServicioSQC = false;
  files = [];
  urlDescarga = '';
  urlContrato = '';
  tieneContrato = false;
  detalleDocumento;
  tieneRolIngenieria = false;
  tieneRolLiderDeEquipo = false;
  tieneRolDirectorDeProyecto = false;

  constructor(private proyectoService: ProyectoService, private configuracionService: ConfiguracionService, private router: Router, private storageService: StorageService) {}

  ngOnInit(): void {
    const params = history.state;
    this.necesidadId = params.id;

    const token = window.sessionStorage.getItem('Authorization');
    const tokenPayload = JSON.parse(atob(token.split('.')[1]));
    this.usuarioId = tokenPayload.id;

    this.consultarPersona();
    this.consultarNecesidadPorId();
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
      this.filtrarMenu(this.usuarioResumen.roles);
    });
  }

  filtrarMenu(roles): void {
    roles.forEach(rol => {
      if (rol.nombre === 'ROLE_INGENIERIA') {
        this.tieneRolIngenieria = true;
      }

      if (rol.nombre === 'ROLE_LIDER_DE_EQUIPO') {
        this.tieneRolLiderDeEquipo = true;
      }

      if (rol.nombre === 'ROLE_DIRECTOR_PROYECTO') {
        this.tieneRolDirectorDeProyecto = true;
      }
    });
  }

  consultarNecesidadPorId(): void {
    this.proyectoService.consultarNecesidadPorId(this.necesidadId).subscribe((response) => {
      this.necesidadResumen = response;
      this.consultarRequerimientosPorId();
      this.proyectoId = this.necesidadResumen.proyecto.id;
      this.definirServicios();
      this.consultarSeleccionesPorId();
    });
  }

  consultarRequerimientosPorId(): void {
    this.proyectoService.consultarRequerimientosPorNecesidadId(this.necesidadId).subscribe((response) => {
      this.requerimientosResumen = response;
      this.urlDescarga = this.requerimientosResumen?.rutaArchivo;
      this.obtenerListaArchivos();
    });
  }

  definirServicios(): void {
    this.necesidadResumen.proyecto.tiposConsultoria.forEach(tipoConsultoria => {
      if(tipoConsultoria.nombre == 'Ingenieria de Requisitos') {
        this.tieneServicioIngenieriaDeRequisitos = true;
      }

      if(tipoConsultoria.nombre == 'SQA') {
        this.tieneServicioSQA = true;
      }

      if(tipoConsultoria.nombre == 'SQC') {
        this.tieneServicioSQC = true;
      }
    });
  }

  consultarSeleccionesPorId(): void {
    this.proyectoService.consultarSeleccionesPorProyectoId(this.proyectoId).subscribe((response) => {
      response.forEach(seleccion => {
        this.seleccionesResumen.push(seleccion);
      });

      if(this.seleccionesResumen.length > 0) {
        this.tieneUsuariosSeleccionados = true;
      }
    });
  }

  consultarContratoPorId(): void {
    this.proyectoService.consultarContratoPorNecesidadId(this.necesidadResumen.id).subscribe((response) => {
      console.log('Data:', response);
      this.urlContrato = response.rutaArchivo;
      this.tieneContrato = true;
    }, (error) => {
      console.log('Error:', error?.error?.mensaje);
      this.tieneContrato = false;
    });
  }

  consultarNombreDeUsuarioPorId(id: number): string {
    let nombreCompleto = '';

    this.configuracionService.consultarPersonaPorId(id).subscribe((response) => {
      nombreCompleto = response.nombre + ' ' + response.apellidos;
    });

    return nombreCompleto;
  }

  abrirIngenieriaDeRequisitos(): void {
    const navigationExtras: NavigationExtras = {
      state: {
        id: this.proyectoId
      }
    };

    this.router.navigate(['/ingenieria-de-requisitos'], navigationExtras);
  }

  obtenerListaArchivos() {
    this.storageService.listaDeArchivosNecesidad(this.necesidadResumen).subscribe((files) => {
      this.files = files;
    });
  }

  downloadFile(): void {
    this.storageService.obtenerArchivoUrl(this.urlDescarga).subscribe((file) => {
      this.detalleDocumento = file;
      const link = document.createElement('a');
      link.href = this.urlDescarga;
      link.target = '_blank';
      link.download = this.urlDescarga.substring(this.urlDescarga.lastIndexOf('/') + 1);
      link.click();
    });
  }

  onAprobarProyecto(): void {
    if(this.tieneRolIngenieria) {
      this.aprobarProyectoPorRolIngenieria();
    } else if(this.tieneRolLiderDeEquipo) {
      this.aprobarProyectoRolLiderDeEquipo();
    } else if (this.tieneRolDirectorDeProyecto) {
      this.aprobarProyectoPorRolDirectorDeProyecto();
    }
  }

  aprobarProyectoPorRolIngenieria(): void {
    this.proyectoService.aprobarProyectoPorRolIngenieria(this.necesidadResumen.proyecto.id).subscribe((response) => {
      console.log('Data:', response);
      window.location.reload();
    });
  }

  aprobarProyectoRolLiderDeEquipo(): void {
    this.proyectoService.aprobarProyectoPorRolLiderDeEquipo(this.necesidadResumen.proyecto.id).subscribe((response) => {
      console.log('Data:', response);
      window.location.reload();
    });
  }

  aprobarProyectoPorRolDirectorDeProyecto(): void {
    this.proyectoService.aprobarProyectoPorRolDirectorDeProyecto(this.necesidadResumen.proyecto.id).subscribe((response) => {
      console.log('Data:', response);
      window.location.reload();
    });
  }
}
