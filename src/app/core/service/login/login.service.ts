import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpService } from '../http.service';
import { Observable } from 'rxjs';
import { Login } from '@core/model/login.model';
import { Respuesta } from '@shared/model/respuesta/respuesta.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly LOGIN_ENDPOINT: string = '/login';

  constructor(private http: HttpService) { }

  validarLogin(login: Login): Observable<Respuesta<number>>  {
    window.sessionStorage.setItem('userdetails', JSON.stringify(login));

    return this.http.doGet<Respuesta<number>>(`${environment.endpoint}${this.LOGIN_ENDPOINT}`);
  }
}
