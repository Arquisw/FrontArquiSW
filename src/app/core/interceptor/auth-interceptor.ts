import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpHeaders, HttpEvent, HttpResponse } from '@angular/common/http';
import {  tap } from 'rxjs/operators';
import { Usuario } from '@core/modelo/usuario.modelo';

const UNAUTHORIZED = 401;

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  user = new Usuario();
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let httpHeaders = new HttpHeaders();
    if(sessionStorage.getItem('userdetails') !== null) {
      this.user = JSON.parse(sessionStorage.getItem('userdetails'));
    }
    if(this.user && this.user.clave && this.user.correo) {
      httpHeaders = httpHeaders.append('Authorization', 'Basic ' + window.btoa(this.user.correo + ':' + this.user.clave));
      
    }else {
      const authorization = sessionStorage.getItem('Authorization');
      if(authorization){
        httpHeaders = httpHeaders.append('Authorization', authorization); 
      }
    }
    this.user=null;
    sessionStorage.removeItem('userdetails');
    const xsrf = sessionStorage.getItem('XSRF-TOKEN');
    if(xsrf) {
      httpHeaders = httpHeaders.append('X-XSRF-TOKEN', xsrf);  
    }
    httpHeaders = httpHeaders.append('X-Requested-With', 'XMLHttpRequest');
    const xhr = req.clone({
      headers: httpHeaders
    });
    return next.handle(xhr).pipe(tap((response: HttpEvent<any>)=> {
      if (response instanceof HttpResponse) {
        if(response.headers.get('Authorization') !== null) {
          window.sessionStorage.setItem('Authorization',response.headers.get('Authorization'));
        }
      }
    },
    (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status !== UNAUTHORIZED) {
          return;
        }
      }
    }));
  }
}