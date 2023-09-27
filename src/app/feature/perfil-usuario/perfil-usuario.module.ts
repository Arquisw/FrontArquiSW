import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { PerfilUsuarioComponent } from './components/perfil/perfil-usuario.component';
import { PerfilUsuarioService } from './shared/service/perfil-usuario.service';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '@shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    PerfilUsuarioComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule,
    NgxPaginationModule
  ],
  exports:[PerfilUsuarioComponent],
  providers: [PerfilUsuarioService, DatePipe]
})
export class PerfilUsuarioModule { }
