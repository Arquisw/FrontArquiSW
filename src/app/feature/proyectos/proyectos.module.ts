import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProyectosComponent } from './components/proyectos/proyectos.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ProyectosRoutingModule } from './proyectos-routing.module';
import { ProyectosService } from './shared/service/proyectos.service';
import { ConsultarProyectosComponent } from './components/consultar-proyectos/consultar-proyectos.component';
import { ConsultarMisProyectosComponent } from './components/consultar-mis-proyectos/consultar-mis-proyectos.component';
import { ConsultarProyectoSeleccionadoComponent } from './components/consultar-proyecto-seleccionado/consultar-proyecto-seleccionado.component';
import { ConsultarProyectoPostuladoComponent } from './components/consultar-proyecto-postulado/consultar-proyecto-postulado.component';
import { SharedModule } from '@shared/shared.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [
    ProyectosComponent,
    ConsultarProyectosComponent,
    ConsultarMisProyectosComponent,
    ConsultarProyectoSeleccionadoComponent,
    ConsultarProyectoPostuladoComponent
  ],
  imports: [
    CommonModule,
    ProyectosRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    SharedModule
  ],
  providers: [ProyectosService]
})
export class ProyectosModule { }
