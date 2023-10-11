import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ProyectoEspecificoService } from '../../shared/service/proyecto-especifico.service';
import { NecesidadResumen } from '@shared/model/proyecto/necesidad-resumen.model';
import { SeleccionResumen } from 'src/app/feature/proyectos/shared/model/seleccion-resumen.model';
import { StorageService } from '@shared/service/storage/storage.service';
import { RequerimientosResumen } from '@shared/model/proyecto/requerimientos-resumen.model';
import { ViewportScroller } from '@angular/common';
import { PropetarioProyecto } from '../../shared/model/propetario-proyecto.model';
import { ProyectoService } from '@shared/service/proyecto/proyecto.service';
import { RolesService } from '@shared/service/roles/roles.service';
import { TokenService } from '@shared/service/token/token.service';

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
  estaCargandoAprobarProyectoPorRolIngenieria = false;
  estaCargandoAprobarProyectoPorRolLiderDeEquipo = false;
  estaCargandoAprobarProyectoPorRolDirectorDeProyecto = false;
  puedeVerContrato = false;
  authorities: string[] = [];
  p = 1;

  constructor(private tokenService: TokenService, private viewportScroller: ViewportScroller,
              private proyectoEspecificoService: ProyectoEspecificoService,
              private proyectoService: ProyectoService,
              private router: Router, private storageService: StorageService,
              private rolesService: RolesService) {}

  ngOnInit(): void {
    this.tokenService.actualizarToken();
    
    this.posicionarPaginaAlInicio();

    const params = history.state;
    this.necesidadId = params.id;

    this.consultarNecesidadPorId();
    this.obtenerAuthorities();
    this.filtrarMenu();
  }

  posicionarPaginaAlInicio(): void {
    this.viewportScroller.scrollToPosition([0, 0]);
  }

  obtenerNombreDelRol(clave: string): string {
    return this.rolesService.obtenerNombreDelRol(clave);
  }

  obtenerAuthorities(): void {
    const token = window.sessionStorage.getItem('Authorization');
    const tokenPayload = JSON.parse(atob(token.split('.')[1]));
    this.usuarioId = tokenPayload.id;
    this.authorities = tokenPayload.authorities.split(',');
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

    this.proyectoEspecificoService.esPropetarioDelProyecto(propetarioProyecto).subscribe((response) => {
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
      if(tipoConsultoria.nombre == 'Ingeniería de requisitos') {
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
    this.proyectoEspecificoService.consultarSeleccionesPorProyectoId(this.proyectoId).subscribe((response) => {
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
    this.seleccionesResumen.forEach(seleccion => {
      if(seleccion.usuarioID === this.usuarioId) {
        this.usuarioActualEstaSeleccionado = true;
      }
    });
  }

  consultarContratoPorId(): void {
    this.proyectoEspecificoService.consultarContratoPorNecesidadId(this.necesidadResumen.id).subscribe((response) => {
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
    this.estaCargandoAprobarProyectoPorRolIngenieria = true;

    this.proyectoEspecificoService.aprobarProyectoPorRolIngenieria(this.necesidadResumen.proyecto.id).subscribe(() => {
      window.location.reload();
    }, (error) => {
      this.estaCargandoAprobarProyectoPorRolIngenieria = false;
      this.aprobacionError = true;
      this.mensajeError = error?.error?.mensaje;
    });
  }

  aprobarProyectoRolLiderDeEquipo(): void {
    this.estaCargandoAprobarProyectoPorRolLiderDeEquipo = true;

    this.proyectoEspecificoService.aprobarProyectoPorRolLiderDeEquipo(this.necesidadResumen.proyecto.id).subscribe(() => {
      window.location.reload();
    }, (error) => {
      this.estaCargandoAprobarProyectoPorRolLiderDeEquipo = false;
      this.aprobacionError = true;
      this.mensajeError = error?.error?.mensaje;
    });
  }

  aprobarProyectoPorRolDirectorDeProyecto(): void {
    this.estaCargandoAprobarProyectoPorRolDirectorDeProyecto = true;

    this.proyectoEspecificoService.aprobarProyectoPorRolDirectorDeProyecto(this.necesidadResumen.proyecto.id).subscribe(() => {
      window.location.reload();
    }, (error) => {
      this.estaCargandoAprobarProyectoPorRolDirectorDeProyecto = false;
      this.aprobacionError = true;
      this.mensajeError = error?.error?.mensaje;
    });
  }

  abrirPerfil(id): void {
    const navigationExtras: NavigationExtras = {
      state: {
        id: id
      }
    };
    this.router.navigate(['/perfil'], navigationExtras);
  }

  usuarioActualPuedeVerElProcesoDeIngenieriaDeRequisitos(): boolean {
    return this.tieneServicioIngenieriaDeRequisitos && (this.usuarioActualEstaSeleccionado || this.usuarioActualEsDuenoDelProyecto);
  }

  usuarioActualPuedeVerElProcesoDeSQA(): boolean {
    return this.tieneServicioSQA && (this.usuarioActualEstaSeleccionado || this.usuarioActualEsDuenoDelProyecto);
  }

  usuarioActualPuedeVerElProcesoDeSQC(): boolean {
    return this.tieneServicioSQC && (this.usuarioActualEstaSeleccionado || this.usuarioActualEsDuenoDelProyecto);
  }

  usuarioActualPuedeVerElMenuDeAprobacion(): boolean {
    return this.usuarioActualEstaSeleccionado && (this.tieneRolIngenieria || this.tieneRolLiderDeEquipo || this.tieneRolDirectorDeProyecto) && (!this.necesidadResumen?.proyecto?.aprobacionProyecto?.ingenieria || !this.necesidadResumen?.proyecto?.aprobacionProyecto?.liderDeEquipo || !this.necesidadResumen?.proyecto?.aprobacionProyecto?.directorDeProyecto);
  }

  usuarioActualPuedeVerElBotonDeAprobacionPorRolIngenieria(): boolean {
    return this.tieneRolIngenieria && !this.necesidadResumen?.proyecto?.aprobacionProyecto?.ingenieria;
  }

  usuarioActualPuedeVerElBotonDeAprobacionPorRolLiderDeEquipo(): boolean {
    return this.tieneRolLiderDeEquipo && !this.necesidadResumen?.proyecto?.aprobacionProyecto?.liderDeEquipo;
  }

  usuarioActualPuedeVerElBotonDeAprobacionPorRolDirectorDeProyecto(): boolean {
    return this.tieneRolDirectorDeProyecto && !this.necesidadResumen?.proyecto?.aprobacionProyecto?.directorDeProyecto;
  }

  usuarioActualPuedeAprobarPorRolLiderDeEquipo(): boolean {
    return this.necesidadResumen.proyecto.aprobacionProyecto.ingenieria;
  }

  usuarioActualPuedeAprobarPorRolDirectorDeProyecto(): boolean {
    return this.necesidadResumen.proyecto.aprobacionProyecto.liderDeEquipo;
  }
}
