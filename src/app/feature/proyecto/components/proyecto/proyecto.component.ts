import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ProyectoService } from '../../shared/service/proyecto.service';
import { NecesidadResumen } from 'src/app/feature/proyectos/shared/model/necesidad-resumen.model';
import { SeleccionResumen } from 'src/app/feature/proyectos/shared/model/seleccion-resumen.model';
import { StorageService } from '@shared/service/storage-service/storage.service';
import { RequerimientosResumen } from 'src/app/feature/proyectos/shared/model/requerimientos-resumen.model';
import { ViewportScroller } from '@angular/common';
import { PropetarioProyecto } from '../../shared/model/propetario-proyecto.model';

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
  seleccionesResumen: SeleccionResumen[] = [];
  tieneUsuariosSeleccionados = false;
  tieneServicioIngenieriaDeRequisitos = false;
  usuarioActualEstaSeleccionado = false;
  usuarioActualEsDuenoDelProyecto = false;
  tieneServicioSQA = false;
  tieneServicioSQC = false;
  aprobacionError = false;
  mensajeError = '';
  files = [];
  urlDescarga = '';
  urlContrato = '';
  tieneContrato = false;
  detalleDocumento;
  tieneRolIngenieria = false;
  tieneRolLiderDeEquipo = false;
  tieneRolDirectorDeProyecto = false;
  puedeVerContrato = false;
  rolesMapa: Map<string, string> = new Map();
  authorities: string[] = [];

  constructor(private viewportScroller: ViewportScroller, private proyectoService: ProyectoService, private router: Router, private storageService: StorageService) {}

  ngOnInit(): void {
    const params = history.state;
    this.necesidadId = params.id;

    const token = window.sessionStorage.getItem('Authorization');
    const tokenPayload = JSON.parse(atob(token.split('.')[1]));
    this.usuarioId = tokenPayload.id;
    this.authorities = tokenPayload.authorities.split(',');

    this.viewportScroller.scrollToPosition([0, 0]);

    this.cargarMapa();
    this.consultarNecesidadPorId();
    this.filtrarMenu();
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

  obtenerNombreDelRol(clave: string): string {
    return this.rolesMapa.get(clave);
  }

  filtrarMenu(): void {
    this.authorities.forEach(authority => {
      if (authority === 'ROLE_INGENIERIA') {
        this.tieneRolIngenieria = true;
      }

      if (authority === 'ROLE_LIDER_DE_EQUIPO') {
        this.tieneRolLiderDeEquipo = true;
      }

      if (authority === 'ROLE_DIRECTOR_PROYECTO') {
        this.tieneRolDirectorDeProyecto = true;
      }

      if(authority === 'ROLE_ASOCIACION') {
        this.consultarSiUsuarioActualEsPropetarioDelProyecto();
      }

      if (authority === 'ROLE_ADMINISTRADOR') {
        this.puedeVerContrato = true;
      }
    });
  }

  consultarSiUsuarioActualEsPropetarioDelProyecto(): void {
    const propetarioProyecto = new PropetarioProyecto(this.necesidadId, this.usuarioId);

    this.proyectoService.esPropetarioDelProyecto(propetarioProyecto).subscribe((response) => {
      if(response.valor) {
        this.usuarioActualEsDuenoDelProyecto = true;
        this.puedeVerContrato = true;
      }
    });
  }

  consultarNecesidadPorId(): void {
    this.proyectoService.consultarNecesidadPorId(this.necesidadId).subscribe((response) => {
      this.necesidadResumen = response;
      this.consultarRequerimientosPorId();
      this.consultarContratoPorId();
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

        this.validarSiUsuarioActualEstaSeleccionado();
      }
    });
  }

  validarSiUsuarioActualEstaSeleccionado(): void {
    this.authorities.forEach(authority => {
      if (authority === 'ROLE_SELECCIONADO') {
        this.seleccionesResumen.forEach(seleccion => {
          if(seleccion.usuarioID === this.usuarioId) {
            this.usuarioActualEstaSeleccionado = true;
          }
        });
      }
    });
  }

  consultarContratoPorId(): void {
    this.proyectoService.consultarContratoPorNecesidadId(this.necesidadResumen.id).subscribe((response) => {
      this.urlContrato = response?.rutaArchivo;
      this.tieneContrato = true;
    }, (error) => {
      console.log('Error:', error?.error?.mensaje);
      this.tieneContrato = false;
    });
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

  obtenerPuedeVerArchivo(nombre: string): boolean {
    const contratoPatron = /_Contrato.pdf$/;
    const requerimientoPatron = /_Requerimientos.pdf$/;

    if(contratoPatron.test(nombre)) {
      return this.puedeVerContrato;
    } else if(requerimientoPatron.test(nombre)) {
      return true;
    } else {
      return false;
    }
  }

  downloadFile(nombre: string): void {
    const contratoPatron = /_Contrato.pdf$/;
    const requerimientosPatron = /_Requerimientos.pdf$/;
    let url = '';

    if(contratoPatron.test(nombre)) {
      url = this.urlContrato;
    }

    if(requerimientosPatron.test(nombre)) {
      url = this.urlDescarga;
    }

    this.storageService.obtenerArchivoUrl(url).subscribe((file) => {
      this.detalleDocumento = file;
      const link = document.createElement('a');
      link.href = url;
      link.target = '_blank';
      link.download = url.substring(url.lastIndexOf('/') + 1);
      link.click();
    });
  }

  aprobarProyectoPorRolIngenieria(): void {
    this.proyectoService.aprobarProyectoPorRolIngenieria(this.necesidadResumen.proyecto.id).subscribe(() => {
      window.location.reload();
    }, (error) => {
      this.aprobacionError = true;
      this.mensajeError = error?.error?.mensaje;
    });
  }

  aprobarProyectoRolLiderDeEquipo(): void {
    this.proyectoService.aprobarProyectoPorRolLiderDeEquipo(this.necesidadResumen.proyecto.id).subscribe(() => {
      window.location.reload();
    }, (error) => {
      this.aprobacionError = true;
      this.mensajeError = error?.error?.mensaje;
    });
  }

  aprobarProyectoPorRolDirectorDeProyecto(): void {
    this.proyectoService.aprobarProyectoPorRolDirectorDeProyecto(this.necesidadResumen.proyecto.id).subscribe(() => {
      window.location.reload();
    }, (error) => {
      this.aprobacionError = true;
      this.mensajeError = error?.error?.mensaje;
    });
  }

  abrirPerfil(id): void {
    const navigationExtras: NavigationExtras = {
      state: {
        id: id,
        usuario: null,
      }
    };
    this.router.navigate(['/perfil'], navigationExtras);
  }
}
