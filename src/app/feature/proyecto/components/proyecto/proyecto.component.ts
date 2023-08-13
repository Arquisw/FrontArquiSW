import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ProyectoService } from '../../shared/service/proyecto.service';
import { NecesidadResumen } from 'src/app/feature/proyectos/shared/model/necesidad-resumen.model';
import { ConfiguracionService } from 'src/app/feature/configuracion/shared/service/configuracion.service';
import { SeleccionResumen } from 'src/app/feature/proyectos/shared/model/seleccion-resumen.model';
import { StorageService } from '@shared/service/storage-service/storage.service';

@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.scss']
})
export class ProyectoComponent implements OnInit {
  necesidadId: number;
  proyectoId: number;
  necesidadResumen: NecesidadResumen;
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

  constructor(private route: ActivatedRoute, private proyectoService: ProyectoService, private configuracionService: ConfiguracionService, private router: Router, private storageService: StorageService) {}

  ngOnInit(): void {
    this.necesidadId = parseInt(this.route.snapshot.paramMap.get('id'), 10);

    //const params = history.state;
   

    this.consultarNecesidadPorId();
  }

  consultarNecesidadPorId(): void {
    this.proyectoService.consultarNecesidadPorId(this.necesidadId).subscribe((response) => {
      this.necesidadResumen = response;
      this.urlDescarga = this.necesidadResumen.rutaArchivo;
      this.proyectoId = this.necesidadResumen.proyecto.id;
      this.definirServicios();
      this.consultarSeleccionesPorId();
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
}
