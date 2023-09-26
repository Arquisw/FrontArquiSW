import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ActivarCuentaRespuesta } from '../model/activar-cuenta-respuesta.model';
import { ActivarCuenta } from '../model/activar-cuenta.model';

@Injectable()
export class ActivarCuentaService {
  private readonly USUARIOS_ENDPOINT: string = '/usuarios';
  private readonly ACTIVACION_ENDPOINT: string = '/activacion';
  private readonly ACTIVAR_ENDPOINT: string = '/activar';

  constructor(private http: HttpService) { }

  public iniciarActivacionCuenta(correo: string): Observable<ActivarCuentaRespuesta<number>>
  {
    return this.http.doPostWithOutBody<ActivarCuentaRespuesta<number>>(`${environment.endpoint}${this.USUARIOS_ENDPOINT}${this.ACTIVACION_ENDPOINT}/`, correo);
  }

  public activarCuenta(activarCuenta: ActivarCuenta , correo: string): Observable<ActivarCuentaRespuesta<number>>
  {
    return this.http.doPut<ActivarCuenta, ActivarCuentaRespuesta<number>>(`${environment.endpoint}${this.USUARIOS_ENDPOINT}${this.ACTIVACION_ENDPOINT}${this.ACTIVAR_ENDPOINT}/${correo}`, activarCuenta);
  }
}
