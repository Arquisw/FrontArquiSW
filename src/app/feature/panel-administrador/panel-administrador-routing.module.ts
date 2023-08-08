import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PanelAdministradorComponent } from './components/panel-administrador/panel-administrador.component';
import { AdministrarEliminacionesComponent } from './components/administrar-eliminaciones/administrar-eliminaciones.component';

const routes: Routes = [{
  path: '',
  component: PanelAdministradorComponent,
  children: [
    {
      path: 'eliminaciones',
      component: AdministrarEliminacionesComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanelAdministradorRoutingModule { }
