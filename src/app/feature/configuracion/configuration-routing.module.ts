import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfiguracionComponent } from './components/configuracion/configuracion.component';
import { UsuarioConfiguracionComponent } from './components/usuario-configuracion/usuario-configuracion.component';
import { AsociacionConfiguracionComponent } from './components/asociacion-configuracion/asociacion-configuracion.component';
import { SecurityGuard } from '@core/guard/security.guard';

const routes: Routes = [{
  path: '',
  component: ConfiguracionComponent,
  children: [
    {
      path: 'usuario',
      component: UsuarioConfiguracionComponent,
      canActivate: [SecurityGuard]
    },
    {
      path: 'asociacion',
      component: AsociacionConfiguracionComponent,
      canActivate: [SecurityGuard]
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfiguracionRoutingModule { }
