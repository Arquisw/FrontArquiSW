import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IngenieriaDeRequisitosComponent } from './components/ingenieria-de-requisitos/ingenieria-de-requisitos.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { IngenieriaDeRequisitosRoutingModule } from './ingenieria-de-requisitos-routing.module';
import { IngenieriaDeRequisitosService } from './shared/service/ingenieria-de-requisitos.service';

@NgModule({
  declarations: [
    IngenieriaDeRequisitosComponent
  ],
  imports: [
    CommonModule,
    IngenieriaDeRequisitosRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [IngenieriaDeRequisitosService]
})
export class IngenieriaDeRequisitosModule { }
