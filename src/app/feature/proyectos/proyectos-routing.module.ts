import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProyectosComponent } from './components/proyectos/proyectos.component';
import { ConsultarProyectosComponent } from './components/consultar-proyectos/consultar-proyectos.component';
import { ConsultarMisProyectosComponent } from './components/consultar-mis-proyectos/consultar-mis-proyectos.component';
import { ConsultarProyectosSeleccionadoComponent } from './components/consultar-proyectos-seleccionado/consultar-proyectos-seleccionado.component';
import { ConsultarProyectosPostuladoComponent } from './components/consultar-proyectos-postulado/consultar-proyectos-postulado.component';
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
      path: 'proyectos-seleccionado',
      component: ConsultarProyectosSeleccionadoComponent,
      canActivate: [SecurityGuard]
    },
    {
      path: 'proyectos-postulado',
      component: ConsultarProyectosPostuladoComponent,
      canActivate: [SecurityGuard]
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProyectosRoutingModule { }
