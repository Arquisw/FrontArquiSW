import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProyectosComponent } from './components/proyectos/proyectos.component';
import { ConsultarProyectosComponent } from './components/consultar-proyectos/consultar-proyectos.component';
import { ConsultarMisProyectosComponent } from './components/consultar-mis-proyectos/consultar-mis-proyectos.component';
import { ConsultarProyectoSeleccionadoComponent } from './components/consultar-proyecto-seleccionado/consultar-proyecto-seleccionado.component';
import { ConsultarProyectoPostuladoComponent } from './components/consultar-proyecto-postulado/consultar-proyecto-postulado.component';
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
      path: 'proyecto-seleccionado',
      component: ConsultarProyectoSeleccionadoComponent,
      canActivate: [SecurityGuard]
    },
    {
      path: 'proyecto-postulado',
      component: ConsultarProyectoPostuladoComponent,
      canActivate: [SecurityGuard]
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProyectosRoutingModule { }
