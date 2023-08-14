import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProyectosComponent } from './components/proyectos/proyectos.component';
import { ConsultarProyectosComponent } from './components/consultar-proyectos/consultar-proyectos.component';
import { ConsultarMisProyectosComponent } from './components/consultar-mis-proyectos/consultar-mis-proyectos.component';
import { ConsultarProyectosSeleccionadosComponent } from './components/consultar-proyectos-seleccionados/consultar-proyectos-seleccionados.component';
import { ConsultarProyectosPostuladosComponent } from './components/consultar-proyectos-postulados/consultar-proyectos-postulados.component';
import { SecurityGuard } from '@core/guard/security.guard';

const routes: Routes = [{
  path: '',
  component: ProyectosComponent,
  children: [
    {
      path: 'buscar',
      component: ConsultarProyectosComponent,
      canActivate: [SecurityGuard]
    },
    {
      path: 'mis-proyectos',
      component: ConsultarMisProyectosComponent,
      canActivate: [SecurityGuard]
    },
    {
      path: 'proyectos-seleccionados',
      component: ConsultarProyectosSeleccionadosComponent,
      canActivate: [SecurityGuard]
    },
    {
      path: 'proyectos-postulados',
      component: ConsultarProyectosPostuladosComponent,
      canActivate: [SecurityGuard]
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProyectosRoutingModule { }
