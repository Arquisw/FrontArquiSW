import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SecurityGuard } from '@core/guard/security.guard';

import { AcercanosotrosComponent } from './feature/acercanosotros/acercanosotros.component';
import { FundamentacionComponent } from './feature/fundamentacion/fundamentacion.component';
import { InicioComponent } from './feature/inicio/inicio.component';
import { PresentacionComponent } from './feature/presentacion/presentacion.component';


const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent, canActivate: [SecurityGuard]  },
  { path: 'fundamentacion', component: FundamentacionComponent, canActivate: [SecurityGuard]  },
  { path: 'acercaNosotros', component: AcercanosotrosComponent, canActivate: [SecurityGuard]  },
  { path: 'presentacion', component: PresentacionComponent, canActivate: [SecurityGuard]  },
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
