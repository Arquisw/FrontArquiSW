import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import { Observable } from 'rxjs';
import { ProyectoResumen } from 'src/app/feature/proyectos/shared/model/proyecto-resumen.model';
import { environment } from 'src/environments/environment';
import { FaseResumen } from '../model/fase-resumen.module';
import { EtapaResumen } from '../model/etapa-resumen.module';

@Injectable()
export class IngenieriaDeRequisitosService {
  private readonly NECESIDADES_ENDPOINT: string = '/necesidades';
  private readonly PROYECTOS_ENDPOINT: string = '/proyectos';
  private readonly FASES_ENDPOINT: string = '/fases';
  private readonly PROYECTO_ENDPOINT: string = '/proyecto';
  private readonly ETAPA_ENDPOINT: string = '/etapa';

  constructor(private httpService: HttpService) { }

  public consultarProyectoPorId(id: number): Observable<ProyectoResumen>
  {
    return this.httpService.doGetById<ProyectoResumen>(`${environment.endpoint}${this.NECESIDADES_ENDPOINT}${this.PROYECTOS_ENDPOINT}/`, id);
  }

  public consultarFasesPorProyectoPorId(id: number): Observable<FaseResumen[]>
  {
    return this.httpService.doGetById<FaseResumen[]>(`${environment.endpointIDR}${this.FASES_ENDPOINT}${this.PROYECTO_ENDPOINT}/`, id);
  }

  public consultarEtapaPorId(id: number): Observable<EtapaResumen>
  {
    return this.httpService.doGetById<EtapaResumen>(`${environment.endpointIDR}${this.FASES_ENDPOINT}${this.ETAPA_ENDPOINT}/`, id);
  }
}
