import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { PerfilComponent } from './components/perfil/perfil.component';
import { PerfilService } from './shared/service/perfil.service';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    PerfilComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule
  ],
  exports:[PerfilComponent],
  providers: [PerfilService, DatePipe]
})
export class PerfilModule { }
