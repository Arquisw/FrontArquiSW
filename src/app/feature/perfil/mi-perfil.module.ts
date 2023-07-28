import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MiPerfilComponent } from './mi-perfil/mi-perfil.component';
import { MiPerfilService } from './service/mi-perfil.service';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    MiPerfilComponent

  ],
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule
  ],
  exports:[MiPerfilComponent],
  providers: [MiPerfilService, DatePipe]
})
export class MiPerfilModule { }
