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
  urlArchivo;


  constructor(private storage: AngularFireStorage) { }


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
            this.enviarHojaDeVida();
            this.closeModal();       
          });
        })
      ).subscribe();
    }
  }

  enviarHojaDeVida() {
    this.enviarValor.emit(this.urlArchivo); 
  }

  closeModal() {
    const modalElement = document.getElementById('cargarArchivo');
    if (modalElement) {
      modalElement.classList.remove('show');
    }

    const modalBackdrop = document.querySelector('.modal-backdrop');
    if (modalBackdrop) {
      modalBackdrop.remove();
    }
  }
}



 








