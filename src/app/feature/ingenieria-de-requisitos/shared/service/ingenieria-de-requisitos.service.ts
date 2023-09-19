import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import { Observable } from 'rxjs';
import { ProyectoResumen } from 'src/app/feature/proyectos/shared/model/proyecto-resumen.model';
import { environment } from 'src/environments/environment';
import { FaseResumen } from '../model/fase-resumen.module';
import { EtapaResumen } from '../model/etapa-resumen.module';
import { VersionResumen } from '../model/version-resumen.module';
import { IngenieriaDeRequisitosRespuesta } from '../model/ingenieria-de-requisitos-respuesta.module';
import { Requisito } from '../model/requisito.model';
import { RequisitoResumen } from '../model/requisito-resumen.module';
import { MotivoRechazoVersion } from '../model/motivo-rechazo-version.module';
import { RequisitosFinales } from '../model/requisitos-finales.module';
import { RequisitosFinalesResumen } from '../model/requisitos-finales-resumen.module';

@Injectable()
export class IngenieriaDeRequisitosService {
  private readonly NECESIDADES_ENDPOINT: string = '/necesidades';
  private readonly PROYECTOS_ENDPOINT: string = '/proyectos';
  private readonly FASES_ENDPOINT: string = '/fases';
  private readonly APROBACION_ENDPOINT: string = '/aprobacion';
  private readonly PROYECTO_ENDPOINT: string = '/proyecto';
  private readonly REQUISITOS_ENDPOINT: string = '/requisitos';
  private readonly VERSIONES_ENDPOINT: string = '/versiones';
  private readonly VERSION_ENDPOINT: string = '/version';
  private readonly ETAPA_ENDPOINT: string = '/etapa';
  private readonly RECHAZAR_ENDPOINT: string = '/rechazar';
  private readonly FINALES_ENDPOINT: string = '/finales';

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

  public aprobarEtapa(id: number): Observable<IngenieriaDeRequisitosRespuesta<number>>
  {
    return this.httpService.doPutWithOutBody<IngenieriaDeRequisitosRespuesta<number>>(`${environment.endpointIDR}${this.FASES_ENDPOINT}${this.APROBACION_ENDPOINT}/`, id);
  }

  public consultarVersionesPorEtapaId(id: number): Observable<VersionResumen[]>
  {
    return this.httpService.doGetById<VersionResumen[]>(`${environment.endpointIDR}${this.REQUISITOS_ENDPOINT}${this.VERSIONES_ENDPOINT}${this.ETAPA_ENDPOINT}/`, id);
  }

  public consultarVersionPorId(id: number): Observable<VersionResumen>
  {
    return this.httpService.doGetById<VersionResumen>(`${environment.endpointIDR}${this.REQUISITOS_ENDPOINT}${this.VERSIONES_ENDPOINT}/`, id);
  }

  public generarVersionInicial(id: number): Observable<IngenieriaDeRequisitosRespuesta<number>>
  {
    return this.httpService.doPostWithOutBodyAndId<IngenieriaDeRequisitosRespuesta<number>>(`${environment.endpointIDR}${this.REQUISITOS_ENDPOINT}${this.VERSIONES_ENDPOINT}/`, id);
  }

  public generarVersionFinal(id: number): Observable<IngenieriaDeRequisitosRespuesta<number>>
  {
    return this.httpService.doPutWithOutBody<IngenieriaDeRequisitosRespuesta<number>>(`${environment.endpointIDR}${this.REQUISITOS_ENDPOINT}${this.VERSIONES_ENDPOINT}/`, id);
  }

  public rechazarVersionPorId(motivoRechazoVersion: MotivoRechazoVersion, id: number): Observable<IngenieriaDeRequisitosRespuesta<number>>
  {
    return this.httpService.doPut<MotivoRechazoVersion, IngenieriaDeRequisitosRespuesta<number>>(`${environment.endpointIDR}${this.REQUISITOS_ENDPOINT}${this.VERSIONES_ENDPOINT}${this.RECHAZAR_ENDPOINT}/${id}`, motivoRechazoVersion);
  }

  public guardarRequisito(requisito: Requisito , id: number): Observable<IngenieriaDeRequisitosRespuesta<number>>
  {
    return this.httpService.doPost<Requisito, IngenieriaDeRequisitosRespuesta<number>>(`${environment.endpointIDR}${this.REQUISITOS_ENDPOINT}/${id}`, requisito);
  }

  public actualizarRequisito(requisito: Requisito , id: number): Observable<IngenieriaDeRequisitosRespuesta<number>>
  {
    return this.httpService.doPut<Requisito, IngenieriaDeRequisitosRespuesta<number>>(`${environment.endpointIDR}${this.REQUISITOS_ENDPOINT}/${id}`, requisito);
  }

  public eliminarRequisito(id: number): Observable<IngenieriaDeRequisitosRespuesta<number>>
  {
    return this.httpService.doDelete<IngenieriaDeRequisitosRespuesta<number>>(`${environment.endpointIDR}${this.REQUISITOS_ENDPOINT}/${id}`);
  }

  public consultarRequisitosPorVersionId(id: number): Observable<RequisitoResumen[]>
  {
    return this.httpService.doGetById<RequisitoResumen[]>(`${environment.endpointIDR}${this.REQUISITOS_ENDPOINT}${this.VERSION_ENDPOINT}/`, id);
  }

  public guardarRequisitosFinales(requisitosFinales: RequisitosFinales , id: number): Observable<IngenieriaDeRequisitosRespuesta<number>>
  {
    return this.httpService.doPost<RequisitosFinales, IngenieriaDeRequisitosRespuesta<number>>(`${environment.endpointIDR}${this.REQUISITOS_ENDPOINT}/${this.FINALES_ENDPOINT}/${id}`, requisitosFinales);
  }

  public consultarRequisitosFinalesPorEtapaID(id: number): Observable<RequisitosFinalesResumen>
  {
    return this.httpService.doGetById<RequisitosFinalesResumen>(`${environment.endpointIDR}${this.REQUISITOS_ENDPOINT}${this.FINALES_ENDPOINT}/`, id);
  }
}
