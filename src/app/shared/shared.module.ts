import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ModalCargarPdfComponent } from './components/modal-cargar-pdf/modal-cargar-pdf.component';
import { ModalDescripcionComponent } from './components/modal-descripcion/modal-descripcion.component';

@NgModule({
  declarations: [
    ModalCargarPdfComponent,
    ModalDescripcionComponent
  ],
  imports: [ReactiveFormsModule, FormsModule],
  exports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ModalCargarPdfComponent,
    ModalDescripcionComponent
  ]
})
export class SharedModule { }
