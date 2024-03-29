import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from '@core/core.module';
import { CookieService } from 'ngx-cookie-service';
import { InicioComponent } from './feature/inicio/inicio.component';
import { FundamentacionComponent } from './feature/fundamentacion/fundamentacion.component';
import { AcercanosotrosComponent } from './feature/acercanosotros/acercanosotros.component';
import { PresentacionComponent } from './feature/presentacion/presentacion.component';
import { ConfiguracionModule } from './feature/configuracion/configuracion.module';
import { PerfilUsuarioModule } from './feature/perfil-usuario/perfil-usuario.module';
import { PerfilAsociacionModule } from './feature/perfil-asociacion/perfil-asociacion.module';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { RecuperarClaveModule } from './feature/recuperar-clave/recuperar-clave.module';
import { ProyectosModule } from './feature/proyectos/proyectos.module';
import { ProyectoModule } from './feature/proyecto/proyecto.module';
import { PanelAdministradorModule } from './feature/panel-administrador/panel-administrador.module';
import { IngenieriaDeRequisitosModule } from './feature/ingenieria-de-requisitos/ingenieria-de-requisitos.module';
import { SharedModule } from '@shared/shared.module';
import { ActivarCuentaModule } from './feature/activar-cuenta/activar-cuenta.module';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    FundamentacionComponent,
    AcercanosotrosComponent,
    PresentacionComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    PerfilUsuarioModule,
    PerfilAsociacionModule,
    ConfiguracionModule,
    ProyectosModule,
    ProyectoModule,
    RecuperarClaveModule,
    PanelAdministradorModule,
    IngenieriaDeRequisitosModule,
    SharedModule,
    ActivarCuentaModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
