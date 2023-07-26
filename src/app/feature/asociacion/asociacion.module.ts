import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MiAsociacionComponent } from './mi-asociacion/mi-asociacion.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MiAsociacionService } from './service/mi-asociacion.service';

@NgModule({
  declarations: [
    MiAsociacionComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  exports: [MiAsociacionComponent],
  providers: [MiAsociacionService, DatePipe]
})
export class AsociacionModule { }
