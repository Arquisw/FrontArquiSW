import { NgModule, ErrorHandler, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SecurityGuard } from './guard/security.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './interceptor/token-interceptor';
import { AuthInterceptor } from './interceptor/auth-interceptor';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HttpService } from './services/http.service';
import { ManejadorError } from './interceptor/manejador-error';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './components/footer/footer.component';
import { AsociacionModule } from '../feature/asociacion/asociacion.module';


@NgModule({
  declarations: [NavbarComponent, FooterComponent],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    AsociacionModule
    
  ],
  exports: [NavbarComponent, FooterComponent],
  providers: [
    HttpService,
    SecurityGuard,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: ErrorHandler, useClass: ManejadorError }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CoreModule { }
