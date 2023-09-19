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
  estaCargandoEliminar : boolean[] = [];
  estaCargandoGuardar = false;
  estaCargandoActualizar = false;
  files = [];
  p = 1;
  tiposDisponibles = [];
  tiposSeleccionados = [];
  dropdownSettings = {};

  constructor(private storage: AngularFireStorage,
              private proyectosService: ProyectosService,
              private router: Router) {
    this.necesidades.forEach(() => this.estaCargandoEliminar.push(false));
  }

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

    this.tiposDisponibles = [
      { tipoCodigo: 'Ingenieria de Requisitos', tipo: 'Ingenieria de Requisitos' },
      { tipoCodigo: 'SQA', tipo: 'SQA' },
      { tipoCodigo: 'SQC', tipo: 'SQC' }
    ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'tipoCodigo',
      textField: 'tipo',
      allowSearchFilter: false,
      enableCheckAll: false
    };
  }

  open(): void {
    this.loginModal = new Modal(document.getElementById('saveNeed') ?? false, {
      keyboard: false
    });
    this.tiposSeleccionados = [];
    this.loginModal?.show();
  }

  onClickSaveNeed(): void {
    this.estaCargandoGuardar = true;

    if (this.archivo) {
      this.saveNeed();
    } else {
      this.estaCargandoGuardar = false;
      this.guardadoError = true;
      this.mensajeError = 'El archivo de los detalles de la necesidad es obligatorio';
    }
  }

  saveNeed(): void {
    if (this.tiposSeleccionados.length > 0) {
      const tiposConsultoria: TipoConsultoria[] = [];

      this.tiposSeleccionados.forEach(tipoConsultoria => {
        const tipoConsultoriaModel = new TipoConsultoria(tipoConsultoria.tipo);
        tiposConsultoria.push(tipoConsultoriaModel);
      });

      const proyecto = new Proyecto(this.guardarNecesidadForm.get('nombreProyecto')?.value, this.guardarNecesidadForm.get('descripcionProyecto')?.value, tiposConsultoria);

      this.proyectosService.guardar(proyecto, this.asociacionId).subscribe((response) => {
        console.log('Data:', response);
        this.necesidadId = response.valor;
        this.uploadFile();
      }, (error) => {
        this.estaCargandoGuardar = false;
        this.guardadoError = true;
        this.mensajeError = error?.error?.mensaje;
      });
    } else {
      this.estaCargandoGuardar = false;
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
      this.estaCargandoGuardar = false;
      this.guardadoError = true;
      this.mensajeError = error?.error?.mensaje;
    });
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
    this.tiposSeleccionados = [];
    this.necesidad = this.necesidades.find(item => item?.id === id);
    this.necesidadId = this.necesidad.id;
    console.log(this.necesidad)
    this.necesidad.proyecto.tiposConsultoria.forEach(tipoConsultoria => {
      const tipoEncontrado = this.tiposSeleccionados.find(item => item.tipoCodigo === tipoConsultoria.nombre);
      if(!tipoEncontrado){
        this.tiposSeleccionados = this.tiposSeleccionados.concat({ tipoCodigo: tipoConsultoria.nombre, tipo: tipoConsultoria.nombre  });
      }
    });

    this.consultarRequerimientos();
  }

  consultarRequerimientos(): void {
    this.proyectosService.consultarRequerimientosPorNecesidadId(this.necesidadId).subscribe((response) => {
      this.urlArchivo = response?.rutaArchivo;
    });
  }

  onClickUpdateNeed(): void {
    this.estaCargandoActualizar = true;

    this.actualizarNecesidad();
  }

  actualizarNecesidad(): void {
    if (this.tiposSeleccionados.length > 0) {
      const tiposConsultoria: TipoConsultoria[] = [];

      this.tiposSeleccionados.forEach(tipoConsultoria => {

        const tipoConsultoriaModel = new TipoConsultoria(tipoConsultoria.tipo);
        tiposConsultoria.push(tipoConsultoriaModel);
      });

      const proyecto = new Proyecto(this.actualizarNecesidadForm.get('nombreProyectoActualizar')?.value, this.actualizarNecesidadForm.get('descripcionProyectoActualizar')?.value, tiposConsultoria);
      this.proyectosService.actualizar(proyecto, this.necesidad.id).subscribe(() => {
        this.updateFile();
      }, (error) => {
        this.estaCargandoActualizar = false;
        this.actualizacionError = true;
        this.mensajeError = error?.error?.mensaje;
      });
    } else {
      this.estaCargandoActualizar = false;
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
    } else {
      this.loginModal?.hide();
      window.location.reload();
    }
  }

  actualizarRequerimientos(): void {
    const requerimientos = new Requerimientos(this.urlArchivo);
    this.proyectosService.actualizarRequerimientos(requerimientos, this.necesidadId).subscribe(() => {
      this.loginModal?.hide();
      window.location.reload();
    }, (error) => {
      this.estaCargandoActualizar = false;
      this.actualizacionError = true;
      this.mensajeError = error?.error?.mensaje;
    });
  }

  onEliminar(id: number, indice:number): void {
    this.estaCargandoEliminar[indice] = true;

    this.proyectosService.eliminar(id).subscribe((response) => {
      console.log('Data:', response);
      this.router.navigate(['/proyectos/']);
    }, (error) => {
      this.estaCargandoEliminar[indice]  = false;
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
