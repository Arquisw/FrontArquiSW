import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MiPerfilComponent } from './mi-perfil/mi-perfil.component';
import { MiPerfilService } from './service/mi-perfil.service';
import { HttpClientModule } from '@angular/common/http';
import { ModalCargarPdfComponent } from '../modales/modal-cargar-pdf/modal-cargar-pdf.component';




@NgModule({
  declarations: [
    MiPerfilComponent,
    ModalCargarPdfComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [MiPerfilService, DatePipe]
})
export class MiPerfilModule { }
