import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SecurityGuard } from '@core/guard/security.guard';
import { AcercanosotrosComponent } from './feature/acercanosotros/acercanosotros.component';
import { FundamentacionComponent } from './feature/fundamentacion/fundamentacion.component';
import { InicioComponent } from './feature/inicio/inicio.component';
import { PresentacionComponent } from './feature/presentacion/presentacion.component';
import { PerfilAsociacionComponent } from './feature/perfil-asociacion/components/perfil-asociacion/perfil-asociacion.component';
import { PerfilUsuarioComponent } from './feature/perfil-usuario/components/perfil/perfil-usuario.component';
import { RecuperarClaveComponent } from './feature/recuperar-clave/components/recuperar-clave/recuperar-clave.component';
import { ProyectoComponent } from './feature/proyecto/components/proyecto/proyecto.component';
import { IngenieriaDeRequisitosComponent } from './feature/ingenieria-de-requisitos/components/ingenieria-de-requisitos/ingenieria-de-requisitos.component';
import { EtapaComponent } from './feature/ingenieria-de-requisitos/components/etapa/etapa.component';
import { VersionComponent } from './feature/ingenieria-de-requisitos/components/version/version.component';
import { ActivarCuentaComponent } from './feature/activar-cuenta/components/activar-cuenta/activar-cuenta.component';

const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent  },
  { path: 'fundamentacion', component: FundamentacionComponent },
  { path: 'acerca-de-nosotros', component: AcercanosotrosComponent  },
  { path: 'presentacion', component: PresentacionComponent  },
  { path: 'recuperar-clave', component: RecuperarClaveComponent },
  { path: 'asociacion', component: PerfilAsociacionComponent, canActivate: [SecurityGuard] },
  { path: 'perfil', component: PerfilUsuarioComponent, canActivate: [SecurityGuard] },
  { path: 'proyecto', component: ProyectoComponent, canActivate: [SecurityGuard] },
  { path: 'configuracion', loadChildren: () => import('./feature/configuracion/configuracion.module').then(mod => mod.ConfiguracionModule), canActivate: [SecurityGuard] },
  { path: 'proyectos', loadChildren: () => import('./feature/proyectos/proyectos.module').then(mod => mod.ProyectosModule), canActivate: [SecurityGuard] },
  { path: 'ingenieria-de-requisitos', component: IngenieriaDeRequisitosComponent, canActivate: [SecurityGuard] },
  { path: 'ingenieria-de-requisitos/etapa', component: EtapaComponent, canActivate: [SecurityGuard] },
  { path: 'ingenieria-de-requisitos/etapa/version', component: VersionComponent, canActivate: [SecurityGuard] },
  { path: 'panel-administrador', loadChildren: () => import('./feature/panel-administrador/panel-administrador.module').then(mod => mod.PanelAdministradorModule), canActivate: [SecurityGuard] },
  { path: 'activar-cuenta', component: ActivarCuentaComponent, canActivate: [SecurityGuard] },
  { path: '**', redirectTo: '/inicio' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
