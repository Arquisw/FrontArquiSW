import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelAdministradorComponent } from './components/panel-administrador/panel-administrador.component';
import { AdministrarEliminacionesComponent } from './components/administrar-eliminaciones/administrar-eliminaciones.component';
import { PanelAdministradorRoutingModule } from './panel-administrador-routing.module';



@NgModule({
  declarations: [
    PanelAdministradorComponent,
    AdministrarEliminacionesComponent
  ],
  imports: [
    CommonModule,
    PanelAdministradorRoutingModule
  ]
})
export class PanelAdministradorModule { }
