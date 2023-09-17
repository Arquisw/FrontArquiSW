import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProyectosComponent } from './components/proyectos/proyectos.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ProyectosRoutingModule } from './proyectos-routing.module';
import { ProyectosService } from './shared/service/proyectos.service';
import { ConsultarProyectosComponent } from './components/consultar-proyectos/consultar-proyectos.component';
import { ConsultarMisProyectosComponent } from './components/consultar-mis-proyectos/consultar-mis-proyectos.component';
import { ConsultarProyectosSeleccionadosComponent } from './components/consultar-proyectos-seleccionados/consultar-proyectos-seleccionados.component';
import { ConsultarProyectosPostuladosComponent } from './components/consultar-proyectos-postulados/consultar-proyectos-postulados.component';
import { SharedModule } from '@shared/shared.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    ProyectosComponent,
    ConsultarProyectosComponent,
    ConsultarMisProyectosComponent,
    ConsultarProyectosSeleccionadosComponent,
    ConsultarProyectosPostuladosComponent
  ],
  imports: [
    CommonModule,
    ProyectosRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    SharedModule,
    NgxPaginationModule
  ],
  providers: [ProyectosService]
})
export class ProyectosModule { }
