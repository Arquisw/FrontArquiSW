import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecuperarClaveComponent } from './components/recuperar-clave/recuperar-clave.component';
import { RecuperarClaveService } from './shared/service/recuperar-clave.service';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    RecuperarClaveComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [RecuperarClaveService]
})
export class RecuperarClaveModule { }
