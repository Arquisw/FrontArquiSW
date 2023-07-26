import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';




@Component({
  selector: 'app-modal-cargar-pdf',
  templateUrl: './modal-cargar-pdf.component.html',
  styleUrls: ['./modal-cargar-pdf.component.scss']
})
export class ModalCargarPdfComponent {
  @Input() titulo;
  @Input() usuario;
  @Output() enviarValor  = new EventEmitter();
  @ViewChild('cargarInput') cargarInput: ElementRef;
  selectedFileName: string = 'Seleccionar archivo';
  urlArchivo;


  constructor(private storage: AngularFireStorage) { }




  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.selectedFileName = file ? file.name : 'Seleccionar archivo';
  }


  uploadFile() {
    const inputElement: HTMLInputElement = this.cargarInput.nativeElement;
    const file: File = inputElement.files[0];

    if (file) {
      const filePath = 'ruta/hojaDeVida/'+ this.usuario.apellidos + this.usuario.nombre +'/' + file.name;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, file);

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



 








