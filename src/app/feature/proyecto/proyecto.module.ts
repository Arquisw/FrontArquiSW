import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProyectoComponent } from './components/proyecto/proyecto.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { ProyectoService } from './shared/service/proyecto.service';

@NgModule({
  declarations: [ProyectoComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [ProyectoService]
})
export class ProyectoModule { }
