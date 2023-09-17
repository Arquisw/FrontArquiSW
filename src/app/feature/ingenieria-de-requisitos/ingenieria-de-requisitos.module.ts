import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IngenieriaDeRequisitosComponent } from './components/ingenieria-de-requisitos/ingenieria-de-requisitos.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { IngenieriaDeRequisitosService } from './shared/service/ingenieria-de-requisitos.service';
import { FaseComponent } from './components/fase/fase.component';
import { EtapaComponent } from './components/etapa/etapa.component';
import { VersionComponent } from './components/version/version.component';
import { RequisitoComponent } from './components/requisito/requisito.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    IngenieriaDeRequisitosComponent,
    FaseComponent,
    EtapaComponent,
    VersionComponent,
    RequisitoComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    SharedModule,
    NgxPaginationModule
  ],
  providers: [IngenieriaDeRequisitosService]
})
export class IngenieriaDeRequisitosModule { }
