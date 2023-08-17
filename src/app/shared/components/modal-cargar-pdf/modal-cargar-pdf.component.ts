import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';


@Component({
  selector: 'app-modal-cargar-pdf',
  templateUrl: './modal-cargar-pdf.component.html',
  styleUrls: ['./modal-cargar-pdf.component.scss']
})
export class ModalCargarPdfComponent {
  @Input() modalId: string;
  @Input() titulo;
  @Input() objeto;
  @Output() enviarValor  = new EventEmitter();
  @ViewChild('cargarInput') cargarInput: ElementRef;
  selectedFileName = 'Seleccionar archivo';
  urlArchivo;
  archivo: File;

  constructor(private storage: AngularFireStorage) { }

  onFileSelected(event: any) {
    this.archivo = event.target.files[0];
    this.selectedFileName = this.archivo ?  this.archivo.name : 'Seleccionar archivo';
  }


  uploadFile() {
    if (this.archivo) {
      const filePath = 'hojaDeVida/' + this.objeto.apellidos + this.objeto.nombre + '/' +'Hoja de vida ' + this.objeto.nombre + '.pdf';
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, this.archivo);

      task.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            this.urlArchivo = url;
            this.enviarURL();
          });
        })
      ).subscribe();
    }
  }

  enviarURL() {
    this.enviarValor.emit(this.urlArchivo);
  }
}












