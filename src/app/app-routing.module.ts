import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SecurityGuard } from '@core/guard/security.guard';

import { AcercanosotrosComponent } from './feature/acercanosotros/acercanosotros.component';
import { FundamentacionComponent } from './feature/fundamentacion/fundamentacion.component';
import { InicioComponent } from './feature/inicio/inicio.component';
import { PresentacionComponent } from './feature/presentacion/presentacion.component';
import { AsociacionComponent } from './feature/asociacion/components/asociacion/asociacion.component';
import { PerfilComponent } from './feature/perfil/components/perfil/perfil.component';
import { RecuperarClaveComponent } from './feature/recuperar-clave/components/recuperar-clave/recuperar-clave.component';
import { ProyectoComponent } from './feature/proyecto/components/proyecto/proyecto.component';

const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent  },
  { path: 'fundamentacion', component: FundamentacionComponent },
  { path: 'acerca-de-nosotros', component: AcercanosotrosComponent  },
  { path: 'presentacion', component: PresentacionComponent  },
  { path: 'recuperar-clave', component: RecuperarClaveComponent },
  { path: 'asociacion', component: AsociacionComponent, canActivate: [SecurityGuard] },
  { path: 'perfil', component: PerfilComponent, canActivate: [SecurityGuard] },
  { path: 'proyecto/:id', component: ProyectoComponent, canActivate: [SecurityGuard] },
  { path: 'configuracion', loadChildren: () => import('./feature/configuracion/configuracion.module').then(mod => mod.ConfiguracionModule), canActivate: [SecurityGuard] },
  { path: 'proyectos', loadChildren: () => import('./feature/proyectos/proyectos.module').then(mod => mod.ProyectosModule), canActivate: [SecurityGuard] },
  { path: '**', redirectTo: '/inicio' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
