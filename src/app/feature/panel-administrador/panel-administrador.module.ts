import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { PanelAdministradorComponent } from './components/panel-administrador/panel-administrador.component';
import { AdministrarEliminacionesComponent } from './components/administrar-eliminaciones/administrar-eliminaciones.component';
import { PanelAdministradorRoutingModule } from './panel-administrador-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '@shared/shared.module';
import { AprobacionesComponent } from './components/aprobaciones/aprobaciones.component';
import { AdministradorService } from './shared/service/administrador.service';
import { ContratacionesComponent } from './components/contrataciones/contrataciones.component';
import { RolesComponent } from './components/roles/roles.component';
import { PostulacionesComponent } from './components/postulaciones/postulaciones.component';
import { PostulacionesProyectoComponent } from './components/postulaciones-proyecto/postulaciones-proyecto.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
  declarations: [
    PanelAdministradorComponent,
    AdministrarEliminacionesComponent,
    AprobacionesComponent,
    ContratacionesComponent,
    PostulacionesComponent,
    PostulacionesProyectoComponent,
    RolesComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule,
    PanelAdministradorRoutingModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [AdministradorService, DatePipe]
})
export class PanelAdministradorModule { }
