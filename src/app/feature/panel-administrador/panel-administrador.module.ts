import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { PanelAdministradorComponent } from './components/panel-administrador/panel-administrador.component';
import { AdministrarEliminacionesComponent } from './components/administrar-eliminaciones/administrar-eliminaciones.component';
import { PanelAdministradorRoutingModule } from './panel-administrador-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '@shared/shared.module';
import { AdministradorService } from './shared/service/administrador.service';
import { ContratacionesComponent } from './components/contrataciones/contrataciones.component';
import { RolesComponent } from './components/roles/roles.component';

@NgModule({
  declarations: [
    PanelAdministradorComponent,
    AdministrarEliminacionesComponent,
    ContratacionesComponent,
    RolesComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule,
    PanelAdministradorRoutingModule
  ],
  providers: [AdministradorService, DatePipe]
})
export class PanelAdministradorModule { }
