import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivarCuentaComponent } from './components/activar-cuenta/activar-cuenta.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivarCuentaService } from './shared/service/activar-cuenta.service';

@NgModule({
  declarations: [
    ActivarCuentaComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [ActivarCuentaService]
})
export class ActivarCuentaModule { }
