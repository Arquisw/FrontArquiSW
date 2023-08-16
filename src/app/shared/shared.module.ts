import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ModalCargarPdfComponent } from './components/modal-cargar-pdf/modal-cargar-pdf.component';
import { ModalDescripcionComponent } from './components/modal-descripcion/modal-descripcion.component';
import { ModalConfirmacionComponent } from './components/modal-confirmacion/modal-confirmacion.component';
import { ModalRechazoComponent } from './components/modal-rechazo/modal-rechazo.component';



@NgModule({
  declarations: [
    ModalCargarPdfComponent,
    ModalDescripcionComponent,
    ModalConfirmacionComponent,
    ModalRechazoComponent
  ],
  imports: [ReactiveFormsModule, FormsModule],
  exports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ModalCargarPdfComponent,
    ModalDescripcionComponent,
    ModalConfirmacionComponent,
    ModalRechazoComponent
  ]
})
export class SharedModule { }
