import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import Modal from 'bootstrap/js/dist/modal';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
import { Requerimientos } from '../../shared/model/requerimientos.model';
import { Proyecto } from '../../shared/model/proyecto.model';
import { TipoConsultoria } from '../../shared/model/tipo-consultoria.model';
import { ProyectosService } from '../../shared/service/proyectos.service';
import { NecesidadResumen } from '../../shared/model/necesidad-resumen.model';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-consultar-mis-proyectos',
  templateUrl: './consultar-mis-proyectos.component.html',
  styleUrls: ['./consultar-mis-proyectos.component.scss']
})
export class ConsultarMisProyectosComponent implements OnInit {
  loginModal: Modal | undefined;
  guardarNecesidadForm: FormGroup;
  actualizarNecesidadForm: FormGroup;
  necesidadId = 0;
  asociacionId = 0;
  tiposConsultoriaSeleccionados: string[] = [];
  guardadoError = false;
  mensajeError = '';
  selectedFileName = 'Seleccionar Archivo';
  urlArchivo: string;
  archivo: File;
  nombreProyecto = '';
  necesidades: NecesidadResumen[] = [];
  necesidad: NecesidadResumen;
  tiposConsultoria: string;
  tieneNecesidades = false;
  actualizacionError = false;
  eliminacionError = false;
  files = [];

  constructor(
    private storage: AngularFireStorage,
    private proyectosService: ProyectosService,
    private router: Router) { }

  ngOnInit(): void {
    const token = window.sessionStorage.getItem('Authorization');
    const tokenPayload = JSON.parse(atob(token.split('.')[1]));
    const usuarioId = tokenPayload.id;

    this.consultarAsociacion(usuarioId);

    this.guardarNecesidadForm = new FormGroup({
      nombreProyecto: new FormControl(''),
      descripcionProyecto: new FormControl('')
    });

    this.actualizarNecesidadForm = new FormGroup({
      nombreProyectoActualizar: new FormControl(''),
      descripcionProyectoActualizar: new FormControl('')
    });
  }

  open(): void {
    this.loginModal = new Modal(document.getElementById('saveNeed') ?? false, {
      keyboard: false
    });

    this.loginModal?.show();
  }

  onClickSaveNeed(): void {
    if (this.archivo) {
      this.saveNeed();
    } else {
      this.guardadoError = true;
      this.mensajeError = 'El archivo de los detalles de la necesidad es obligatorio';
    }
  }

  saveNeed(): void {
    if (this.tiposConsultoriaSeleccionados.length > 0) {
      const tiposConsultoria: TipoConsultoria[] = [];

      this.tiposConsultoriaSeleccionados.forEach(tipoConsultoria => {
        const tipoConsultoriaModel = new TipoConsultoria(tipoConsultoria);
        tiposConsultoria.push(tipoConsultoriaModel);
      });

      const proyecto = new Proyecto(this.guardarNecesidadForm.get('nombreProyecto')?.value, this.guardarNecesidadForm.get('descripcionProyecto')?.value, tiposConsultoria);

      this.proyectosService.guardar(proyecto, this.asociacionId).subscribe((response) => {
        console.log('Data:', response);
        this.necesidadId = response.valor;
        this.uploadFile();
      }, (error) => {
        this.guardadoError = true;
        this.mensajeError = error?.error?.mensaje;
      });
    } else {
      this.mensajeError = 'Debes seleccionar por lo menos un servicio de consultoria';
    }
  }

  uploadFile() {
    const filePath = 'necesidad/' + this.necesidadId + '/' + this.guardarNecesidadForm.get('nombreProyecto')?.value + '_Requerimientos' + '.pdf';
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, this.archivo);

    task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          this.urlArchivo = url;
          this.saveRequeriments();
        });
      })
    ).subscribe();
  }

  saveRequeriments(): void {
    const requerimientos = new Requerimientos(this.urlArchivo);

    this.proyectosService.guardarRequerimientos(requerimientos, this.necesidadId).subscribe((response) => {
      console.log('Data:', response);
      this.loginModal?.hide();
      window.location.reload();
    }, (error) => {
      this.guardadoError = true;
      this.mensajeError = error?.error?.mensaje;
    });
  }

  onIngenieriaDeRequisitosSelected(): void {
    const tipoDeConsultoria = 'Ingenieria de Requisitos';

    if (this.tiposConsultoriaSeleccionados.includes(tipoDeConsultoria)) {
      const index = this.tiposConsultoriaSeleccionados.indexOf(tipoDeConsultoria);

      this.tiposConsultoriaSeleccionados.splice(index);
    } else {
      this.tiposConsultoriaSeleccionados.push(tipoDeConsultoria);
    }
  }

  onSQASelected(): void {
    const tipoDeConsultoria = 'SQA';

    if (this.tiposConsultoriaSeleccionados.includes(tipoDeConsultoria)) {
      const index = this.tiposConsultoriaSeleccionados.indexOf(tipoDeConsultoria);

      this.tiposConsultoriaSeleccionados.splice(index);
    } else {
      this.tiposConsultoriaSeleccionados.push(tipoDeConsultoria);
    }
  }

  onSQCSelected(): void {
    const tipoDeConsultoria = 'SQC';

    if (this.tiposConsultoriaSeleccionados.includes(tipoDeConsultoria)) {
      const index = this.tiposConsultoriaSeleccionados.indexOf(tipoDeConsultoria);

      this.tiposConsultoriaSeleccionados.splice(index);
    } else {
      this.tiposConsultoriaSeleccionados.push(tipoDeConsultoria);
    }
  }

  onFileSelected(event: any) {
    this.archivo = event.target.files[0];
    this.selectedFileName = this.archivo ? this.archivo.name : 'Seleccionar Archivo';
  }

  onFileSelectedToUpdate(event: any) {
    this.archivo = event.target.files[0];
    this.selectedFileName = this.archivo ? this.archivo.name : this.files[0].nombre;
  }

  consultarAsociacion(usuarioId: number): void {
    this.proyectosService.consultarAsociacionPorId(usuarioId).subscribe((response) => {
      this.asociacionId = response.id;
      this.consultarNecesidades(this.asociacionId);
    });
  }

  consultarNecesidades(id: number): void {
    this.proyectosService.consultarNecesidadesPorAsociacionId(id).subscribe((response) => {
      this.necesidades = response;

      if (this.necesidades.length > 0) {
        this.tieneNecesidades = true;
      } else {
        this.tieneNecesidades = false;
      }
    });
  }

  openActualizar(id: number): void {
    this.loginModal = new Modal(document.getElementById('updateNeed') ?? false, {
      keyboard: false
    });

    this.loginModal?.show();
    this.tiposConsultoriaSeleccionados = [];
    this.necesidad = this.necesidades.find(item => item?.id === id);
    this.necesidadId = this.necesidad.id;

    this.necesidad.proyecto.tiposConsultoria.forEach(tipoConsultoria => {
      this.tiposConsultoriaSeleccionados.push(tipoConsultoria.nombre);
    });

    this.consultarRequerimientos();
  }

  consultarRequerimientos(): void {
    this.proyectosService.consultarRequerimientosPorNecesidadId(this.necesidadId).subscribe((response) => {
      this.urlArchivo = response?.rutaArchivo;
    });
  }

  onClickUpdateNeed(): void {
    this.actualizarNecesidad();
  }

  actualizarNecesidad(): void {
    if (this.tiposConsultoriaSeleccionados.length > 0) {
      const tiposConsultoria: TipoConsultoria[] = [];

      this.tiposConsultoriaSeleccionados.forEach(tipoConsultoria => {
        const tipoConsultoriaModel = new TipoConsultoria(tipoConsultoria);
        tiposConsultoria.push(tipoConsultoriaModel);
      });

      const proyecto = new Proyecto(this.actualizarNecesidadForm.get('nombreProyectoActualizar')?.value, this.actualizarNecesidadForm.get('descripcionProyectoActualizar')?.value, tiposConsultoria);

      this.proyectosService.actualizar(proyecto, this.asociacionId).subscribe((response) => {
        console.log('Data:', response);
        this.updateFile();
      }, (error) => {
        this.actualizacionError = true;
        this.mensajeError = error?.error?.mensaje;
      });
    } else {
      this.mensajeError = 'Debes seleccionar por lo menos un servicio de consultoria';
    }
  }

  updateFile() {
    if (this.archivo) {
      const filePath = 'necesidad/' + this.necesidadId + '/' + this.actualizarNecesidadForm.get('nombreProyectoActualizar')?.value + '_Requerimientos' + '.pdf';
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, this.archivo);

      task.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            this.urlArchivo = url;
            this.actualizarRequerimientos();
          });
        })
      ).subscribe();
    }
  }

  actualizarRequerimientos(): void {
    const requerimientos = new Requerimientos(this.urlArchivo);
    this.proyectosService.actualizarRequerimientos(requerimientos, this.necesidadId).subscribe((response) => {
      console.log('Data:', response);
      this.loginModal?.hide();
      window.location.reload();
    }, (error) => {
      this.actualizacionError = true;
      this.mensajeError = error?.error?.mensaje;
    });
  }

  onEliminar(id: number): void {
    this.proyectosService.eliminar(id).subscribe((response) => {
      console.log('Data:', response);
      this.router.navigate(['/proyectos/']);
    }, (error) => {
      this.eliminacionError = true;
      this.mensajeError = error?.error?.mensaje;
    });
  }

  abrirPerfilProyecto(id): void {
    const navigationExtras: NavigationExtras = {
      state: {
        id: id
      }
    };
    this.router.navigate(['/proyecto'], navigationExtras);
  }

  esUnaNecesidadRechazada(estado: string): boolean {
    if (estado === 'Rechazado') {
      return true;
    }

    return false;
  }

  obtenerIdModalDescripcion(id: number): string {
    return 'descripcionModal' + id;
  }

  obtenerIdModalMotivoRechazo(id: number): string {
    return 'motivoRechazoModal' + id;
  }

}
