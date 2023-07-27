import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MiPerfilComponent } from './mi-perfil/mi-perfil.component';
import { MiPerfilService } from './service/mi-perfil.service';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '@shared/shared.module';
import { PdfViewerModule } from 'ng2-pdf-viewer';


@NgModule({
  declarations: [
    MiPerfilComponent
    
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule,
    PdfViewerModule
  ],
  exports:[MiPerfilComponent],
  providers: [MiPerfilService, DatePipe]
})
export class MiPerfilModule { }
