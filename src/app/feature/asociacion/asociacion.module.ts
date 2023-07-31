import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AsociacionComponent } from './components/asociacion/asociacion.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AsociacionService } from './shared/service/asociacion.service';

@NgModule({
  declarations: [
    AsociacionComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  exports: [AsociacionComponent],
  providers: [AsociacionService, DatePipe]
})
export class AsociacionModule { }
