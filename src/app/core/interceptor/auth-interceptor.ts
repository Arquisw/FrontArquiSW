import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpHeaders, HttpEvent, HttpResponse } from '@angular/common/http';
import {  tap } from 'rxjs/operators';
import { Usuario } from '@core/modelo/usuario.modelo';
import { Router } from '@angular/router';


const UNAUTHORIZED = 401;

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  user = new Usuario();
  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let httpHeaders = new HttpHeaders();
    if(sessionStorage.getItem('userdetails')){
      this.user = JSON.parse(sessionStorage.getItem('userdetails')!);
    }
    if(this.user && this.user.clave && this.user.correo){
      httpHeaders = httpHeaders.append('Authorization', 'Basic ' + window.btoa(this.user.correo + ':' + this.user.clave));
      
    }else {
      let authorization = sessionStorage.getItem('Authorization');
      if(authorization){
        httpHeaders = httpHeaders.append('Authorization', authorization); 
      }
    }
    
    sessionStorage.removeItem('userdetails')
    let xsrf = sessionStorage.getItem('XSRF-TOKEN');
    if(xsrf){
      httpHeaders = httpHeaders.append('X-XSRF-TOKEN', xsrf);  
    }
    httpHeaders = httpHeaders.append('X-Requested-With', 'XMLHttpRequest');
    const xhr = req.clone({
      headers: httpHeaders
    });
  return next.handle(xhr).pipe(tap((response: HttpEvent<any>)=>{
      if (response instanceof HttpResponse) {
        window.sessionStorage.setItem("Authorization",response.headers.get('Authorization')!);
      }
    },
    (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status !== UNAUTHORIZED) {
            return;
          }
          window.sessionStorage.removeItem("Authorization");
          this.router.navigate(['/inicio']);
        }
      }));
  }
}