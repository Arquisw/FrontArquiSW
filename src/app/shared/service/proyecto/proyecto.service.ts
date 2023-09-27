import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';
import { Observable } from 'rxjs';
import { NecesidadResumen } from '@shared/model/proyecto/necesidad-resumen.model';
import { RequerimientosResumen } from '@shared/model/proyecto/requerimientos-resumen.model';
import { environment } from 'src/environments/environment';
import { ProyectoResumen } from '@shared/model/proyecto/proyecto-resumen.model';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {
  private readonly NECESIDADES_ENDPOINT: string = '/necesidades';
  private readonly REQUERIMIENTOS_ENDPOINT: string = '/requerimientos';
  private readonly PROYECTOS_ENDPOINT: string = '/proyectos';
  private readonly NEGOCICADOS_ENDPOINT: string = '/negociados';

  constructor(private http: HttpService) { }

  public consultarNecesidadPorId(id: number): Observable<NecesidadResumen> {
    return this.http.doGetById<NecesidadResumen>(`${environment.endpoint}${this.NECESIDADES_ENDPOINT}/`, id);
  }

  public consultarProyectoPorId(id: number): Observable<ProyectoResumen>
  {
    return this.http.doGetById<ProyectoResumen>(`${environment.endpoint}${this.NECESIDADES_ENDPOINT}${this.PROYECTOS_ENDPOINT}/`, id);
  }

  public consultarRequerimientosPorNecesidadId(id: number): Observable<RequerimientosResumen>
  {
    return this.http.doGetById<RequerimientosResumen>(`${environment.endpoint}${this.NECESIDADES_ENDPOINT}${this.REQUERIMIENTOS_ENDPOINT}/`, id);
  }

  public consultarProyectosNegociados(): Observable<NecesidadResumen[]>
  {
    return this.http.doGet<NecesidadResumen[]>(`${environment.endpoint}${this.NECESIDADES_ENDPOINT}${this.PROYECTOS_ENDPOINT}${this.NEGOCICADOS_ENDPOINT}`);
  }
}
