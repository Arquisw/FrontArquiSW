import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpService } from '@core/service/http.service';
import { Persona } from '../model/persona.model';
import { Clave } from '../model/clave.model';
import { Asociacion } from '@shared/model/asociacion/asociacion.model';

@Injectable()

export class ConfiguracionService {
  private readonly USUARIOS_ENDPOINT: string = '/usuarios';
  private readonly USUARIOS_CLAVE_ENDPOINT: string = '/clave';
  private readonly ASOCIACIONES_ENDPOINT: string = '/asociaciones';

  constructor(private httpService: HttpService) { }

  public actualizarUsuarioPorId(persona: Persona, id: number): Observable<number>
  {
    return this.httpService.doPut<Persona, number>(`${environment.endpoint}${this.USUARIOS_ENDPOINT}/${id}`, persona);
  }

  public actualizarClavePorId(clave: Clave, id: number): Observable<number>
  {
    return this.httpService.doPut<Clave, number>(`${environment.endpoint}${this.USUARIOS_ENDPOINT}${this.USUARIOS_CLAVE_ENDPOINT}/${id}`, clave);
  }

  public eliminarUsuarioPorId(id: number): Observable<void> {
    return this.httpService.doDelete(`${environment.endpoint}${this.USUARIOS_ENDPOINT}/${id}`);
  }

  public actualizarAsociacionPorId(asociacion: Asociacion, id: number): Observable<number>
  {
    return this.httpService.doPut<Asociacion, number>(`${environment.endpoint}${this.ASOCIACIONES_ENDPOINT}/${id}`, asociacion);
  }

  public eliminarAsociacionPorId(id: number): Observable<void> {
    return this.httpService.doDelete(`${environment.endpoint}${this.ASOCIACIONES_ENDPOINT}/${id}`);
  }
}
