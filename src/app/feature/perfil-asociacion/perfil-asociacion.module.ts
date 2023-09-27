import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { PerfilAsociacionComponent } from './components/perfil-asociacion/perfil-asociacion.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PerfilAsociacionComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  exports: [PerfilAsociacionComponent],
  providers: [DatePipe]
})
export class PerfilAsociacionModule { }
