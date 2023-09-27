import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';
import { Login } from '@core/model/login.model';
import { Respuesta } from '@shared/model/respuesta/respuesta.model';
import { Usuario } from '@core/model/usuario.model';
import { Asociacion } from '@shared/model/asociacion/asociacion.model';

@Injectable({
  providedIn: 'root'
})
export class CoreService {
  private readonly LOGIN_ENDPOINT: string = '/login';
  private readonly USUARIOS_ENDPOINT: string = '/usuarios';
  private readonly ASOCIACION_ENDPOINT: string = '/asociaciones';

  constructor(private http: HttpService) { }

  validarLogin(login: Login): Observable<Respuesta<number>>  {
    window.sessionStorage.setItem('userdetails', JSON.stringify(login));

    return this.http.doGet<Respuesta<number>>(`${environment.endpoint}${this.LOGIN_ENDPOINT}`);
  }

  registrarUsuario(usuario: Usuario): Observable<Respuesta<number>> {
    return this.http.doPost<Usuario, Respuesta<number>>(`${environment.endpoint}${this.USUARIOS_ENDPOINT}`, usuario);
  }

  registrarAsociacion(asociacion: Asociacion, id: number): Observable<Respuesta<number>> {
    return this.http.doPost<Asociacion, Respuesta<number>>(`${environment.endpoint}${this.ASOCIACION_ENDPOINT}/${id}`, asociacion);
  }
}
