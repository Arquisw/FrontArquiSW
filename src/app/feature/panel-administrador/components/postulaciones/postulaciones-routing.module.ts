import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostulacionesProyectoComponent } from './components/postulaciones-proyecto/postulaciones-proyecto.component';
import { PostulacionesComponent } from './components/postulaciones/postulaciones.component';

const routes: Routes = [{
  path: '',
  component: PostulacionesComponent,
  children: [
    {
      path: 'proyecto',
      component: PostulacionesProyectoComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostulacionesRoutingModule { }
