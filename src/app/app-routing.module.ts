import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SecurityGuard } from '@core/guard/security.guard';

import { AcercanosotrosComponent } from './feature/acercanosotros/acercanosotros.component';
import { FundamentacionComponent } from './feature/fundamentacion/fundamentacion.component';
import { InicioComponent } from './feature/inicio/inicio.component';
import { PresentacionComponent } from './feature/presentacion/presentacion.component';
import { MiAsociacionComponent } from './feature/asociacion/mi-asociacion/mi-asociacion.component';

const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent  },
  { path: 'fundamentacion', component: FundamentacionComponent },
  { path: 'acercaNosotros', component: AcercanosotrosComponent  },
  { path: 'presentacion', component: PresentacionComponent  },
  { path: 'miAsociacion/:id', component: MiAsociacionComponent, canActivate: [SecurityGuard] },
  { path: 'configuracion/:id', loadChildren: () => import('./feature/configuracion/configuracion.module').then(mod => mod.ConfiguracionModule), canActivate: [SecurityGuard] },
  { path: '**', redirectTo: '/inicio' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
