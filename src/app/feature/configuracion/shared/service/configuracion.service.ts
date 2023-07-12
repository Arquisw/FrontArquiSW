import { Injectable } from '@angular/core';
import { PersonaResumen } from '../model/persona-resumen.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpService } from '@core/services/http.service';
import { Persona } from '../model/persona.model';
import { Asociacion } from '../model/asociacion.model';
import { AsociacionResumen } from '../model/asociacion-resumen';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionService {
  private readonly USUARIOS_ENDPOINT = '/usuarios';
  private readonly ASOCIACIONES_ENDPOINT = '/asociaciones';

  constructor(private httpService: HttpService) { }

  public consultarUsuarioPorId(id: number): Observable<PersonaResumen>
  {
    return this.httpService.doGetById<PersonaResumen>(`${environment.endpoint}${this.USUARIOS_ENDPOINT}/`, id);
  }

  public actualizarUsuarioPorId(persona: Persona, id: number): Observable<number>
  {
    return this.httpService.doPut<Persona, number>(`${environment.endpoint}${this.USUARIOS_ENDPOINT}/${id}`, persona);
  }

  public actualizarClavePorId(persona: Persona, id: number): Observable<number>
  {
    return this.httpService.doPut<Persona, number>(`${environment.endpoint}${this.USUARIOS_ENDPOINT}/${id}`, persona);
  }

  public eliminarUsuarioPorId(id: number): Observable<void> {
    return this.httpService.doDelete(`${environment.endpoint}${this.USUARIOS_ENDPOINT}/${id}`);
  }

  public consultarAsociacionPorId(id: number): Observable<AsociacionResumen>
  {
    return this.httpService.doGetById<AsociacionResumen>(`${environment.endpoint}${this.ASOCIACIONES_ENDPOINT}/`, id);
  }

  public actualizarAsociacionPorId(asociacion: Asociacion, id: number): Observable<number>
  {
    return this.httpService.doPut<Asociacion, number>(`${environment.endpoint}${this.ASOCIACIONES_ENDPOINT}/${id}`, asociacion);
  }

  public eliminarAsociacionPorId(id: number): Observable<void> {
    return this.httpService.doDelete(`${environment.endpoint}${this.ASOCIACIONES_ENDPOINT}/${id}`);
  }
}
