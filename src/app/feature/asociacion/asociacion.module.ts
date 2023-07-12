import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MiAsociacionComponent } from './mi-asociacion/mi-asociacion.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfiguracionService } from '../configuracion/shared/service/configuracion.service';



@NgModule({
  declarations: [
    MiAsociacionComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [ConfiguracionService, DatePipe]
})
export class AsociacionModule { }
