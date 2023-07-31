import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProyectosComponent } from './components/proyectos/proyectos.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ProyectosRoutingModule } from './proyectos-routing.module';
import { ProyectosService } from './shared/service/proyectos.service';

@NgModule({
  declarations: [
    ProyectosComponent
  ],
  imports: [
    CommonModule,
    ProyectosRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [ProyectosService]
})
export class ProyectosModule { }
