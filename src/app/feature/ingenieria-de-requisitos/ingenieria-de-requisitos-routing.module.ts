import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IngenieriaDeRequisitosComponent } from './components/ingenieria-de-requisitos/ingenieria-de-requisitos.component';
import { EtapaComponent } from './components/etapa/etapa.component';
import { SecurityGuard } from '@core/guard/security.guard';
import { VersionComponent } from './components/version/version.component';

const routes: Routes = [{
  path: '',
  component: IngenieriaDeRequisitosComponent,
  children: [
    {
      path: 'etapa',
      component: EtapaComponent,
      canActivate: [SecurityGuard]
    },
    {
      path: 'version',
      component: VersionComponent,
      canActivate: [SecurityGuard]
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IngenieriaDeRequisitosRoutingModule { }
