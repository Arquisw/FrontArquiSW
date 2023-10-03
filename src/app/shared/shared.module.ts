import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ModalCargarPdfComponent } from './components/modal-cargar-pdf/modal-cargar-pdf.component';
import { ModalDescripcionComponent } from './components/modal-descripcion/modal-descripcion.component';
import { ModalConfirmacionComponent } from './components/modal-confirmacion/modal-confirmacion.component';
import { ModalRechazoComponent } from './components/modal-rechazo/modal-rechazo.component';
import { BannerActivarCuentaComponent } from './components/banner-activar-cuenta/banner-activar-cuenta.component';
import { RouterModule } from '@angular/router';
import { AsociacionService } from './service/asociacion/asociacion.service';
import { StorageService } from './service/storage/storage.service';
import { UsuarioService } from './service/usuario/usuario.service';
import { ProyectoService } from './service/proyecto/proyecto.service';
import { RolesService } from './service/roles/roles.service';

@NgModule({
  declarations: [
    ModalCargarPdfComponent,
    ModalDescripcionComponent,
    ModalConfirmacionComponent,
    ModalRechazoComponent,
    BannerActivarCuentaComponent
  ],
  imports: [
    ReactiveFormsModule,
    RouterModule,
    FormsModule
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ModalCargarPdfComponent,
    ModalDescripcionComponent,
    ModalConfirmacionComponent,
    ModalRechazoComponent,
    BannerActivarCuentaComponent
  ],
  providers: [
    AsociacionService,
    StorageService,
    UsuarioService,
    ProyectoService,
    RolesService
  ]
})
export class SharedModule { }
