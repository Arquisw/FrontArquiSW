import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PanelAdministradorComponent } from './components/panel-administrador/panel-administrador.component';
import { AdministrarEliminacionesComponent } from './components/administrar-eliminaciones/administrar-eliminaciones.component';
import { AprobacionesComponent } from './components/aprobaciones/aprobaciones.component';
import { ContratacionesComponent } from './components/contrataciones/contrataciones.component';
import { RolesComponent } from './components/roles/roles.component';
import { SecurityGuard } from '@core/guard/security.guard';
import { PostulacionesComponent } from './components/postulaciones/postulaciones.component';
import { PostulacionesProyectoComponent } from './components/postulaciones-proyecto/postulaciones-proyecto.component';

const routes: Routes = [{
  path: '',
  component: PanelAdministradorComponent,
  children: [
    {
      path: 'eliminaciones',
      component: AdministrarEliminacionesComponent,
      canActivate: [SecurityGuard]
    },
    {
      path: 'aprobaciones',
      component: AprobacionesComponent,
      canActivate: [SecurityGuard]
    },
    {
      path: 'contrataciones',
      component: ContratacionesComponent,
      canActivate: [SecurityGuard]
    },
    {
      path: 'roles',
      component: RolesComponent,
      canActivate: [SecurityGuard]
    },
    { path: 'postulaciones',
      component: PostulacionesComponent,
      canActivate: [SecurityGuard]
    },
    { path: 'postulaciones-proyecto',
      component: PostulacionesProyectoComponent,
      canActivate: [SecurityGuard]
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanelAdministradorRoutingModule { }
