import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfiguracionComponent } from './components/configuracion/configuracion.component';
import { UsuarioConfiguracionComponent } from './components/usuario-configuracion/usuario-configuracion.component';
import { AsociacionConfiguracionComponent } from './components/asociacion-configuracion/asociacion-configuracion.component';

const routes: Routes = [{
  path: '',
  component: ConfiguracionComponent,
  children: [
    {
      path: 'usuario/:id',
      component: UsuarioConfiguracionComponent
    },
    {
      path: 'asociacion/:id',
      component: AsociacionConfiguracionComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfiguracionRoutingModule { }
