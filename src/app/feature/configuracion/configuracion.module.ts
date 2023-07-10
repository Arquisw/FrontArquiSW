import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ConfiguracionComponent } from './components/configuracion/configuracion.component';
import { UsuarioConfiguracionComponent } from './components/usuario-configuracion/usuario-configuracion.component';
import { AsociacionConfiguracionComponent } from './components/asociacion-configuracion/asociacion-configuracion.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfiguracionService } from './shared/service/configuracion.service';
import { ConfiguracionRoutingModule } from './configuration-routing.module';

@NgModule({
  declarations: [
    ConfiguracionComponent,
    UsuarioConfiguracionComponent,
    AsociacionConfiguracionComponent
  ],
  imports: [
    CommonModule,
    ConfiguracionRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [ConfiguracionService, DatePipe]
})
export class ConfiguracionModule { }
