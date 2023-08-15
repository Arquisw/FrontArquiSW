import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PanelAdministradorComponent } from './components/panel-administrador/panel-administrador.component';
import { AdministrarEliminacionesComponent } from './components/administrar-eliminaciones/administrar-eliminaciones.component';
import { AprobacionesComponent } from './components/aprobaciones/aprobaciones.component';
import { ContratacionesComponent } from './components/contrataciones/contrataciones.component';
import { RolesComponent } from './components/roles/roles.component';
import { SecurityGuard } from '@core/guard/security.guard';

const routes: Routes = [{
  path: '',
  component: PanelAdministradorComponent,
  children: [
    {
      path: 'eliminaciones',
      component: AdministrarEliminacionesComponent
    },
    {
      path: 'aprobaciones',
      component: AprobacionesComponent
    },
    {
      path: 'contrataciones',
      component: ContratacionesComponent
    },
    {
      path: 'roles',
      component: RolesComponent
    },
    { path: 'postulaciones',
      loadChildren: () => import('../../feature/panel-administrador/components/postulaciones/postulaciones.module').then(mod => mod.PostulacionesModule),
      canActivate: [SecurityGuard]
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanelAdministradorRoutingModule { }
