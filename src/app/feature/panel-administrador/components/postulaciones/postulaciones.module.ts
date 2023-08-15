import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostulacionesComponent } from './components/postulaciones/postulaciones.component';
import { PostulacionesProyectoComponent } from './components/postulaciones-proyecto/postulaciones-proyecto.component';
import { PostulacionesRoutingModule } from './postulaciones-routing.module';

@NgModule({
  declarations: [
    PostulacionesComponent,
    PostulacionesProyectoComponent
  ],
  imports: [
    CommonModule,
    PostulacionesRoutingModule
  ]
})
export class PostulacionesModule { }
