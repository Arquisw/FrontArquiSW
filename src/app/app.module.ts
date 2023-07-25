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
import { MiPerfilModule } from './feature/perfil/mi-perfil.module';
import { AsociacionModule } from './feature/asociacion/asociacion.module';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat'; // Ajusta esta línea

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    FundamentacionComponent,
    AcercanosotrosComponent,
    PresentacionComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase), // Ajusta esta línea
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    MiPerfilModule,
    AsociacionModule,
    ConfiguracionModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
