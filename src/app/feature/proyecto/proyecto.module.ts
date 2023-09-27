import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProyectoComponent } from './components/proyecto/proyecto.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { ProyectoEspecificoService } from './shared/service/proyecto-especifico.service';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [ProyectoComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    SharedModule,
    NgxPaginationModule
  ],
  providers: [ProyectoEspecificoService]
})
export class ProyectoModule { }
