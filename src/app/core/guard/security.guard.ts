import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SecurityGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const authorization = sessionStorage.getItem('Authorization');
    if (!authorization) {
      this.router.navigate(['/inicio']);
      return false;
    }
    else if(this.tokenExpired(authorization)){
      this.router.navigate(['/inicio']);
      window.sessionStorage.removeItem('Authorization');
      return false;
    }
    return true;
  }

  private tokenExpired(token: string) {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }
  
 

}
