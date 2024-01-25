import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FaseResumen } from '../model/fase-resumen.module';
import { EtapaResumen } from '../model/etapa-resumen.module';
import { VersionResumen } from '../model/version-resumen.module';
import { Requisito } from '../model/requisito.model';
import { RequisitoResumen } from '../model/requisito-resumen.module';
import { MotivoRechazoVersion } from '../model/motivo-rechazo-version.module';
import { Respuesta } from '@shared/model/respuesta/respuesta.model';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class IngenieriaDeRequisitosService {
  private readonly FASES_ENDPOINT: string = '/fases';
  private readonly APROBACION_ENDPOINT: string = '/aprobacion';
  private readonly PROYECTO_ENDPOINT: string = '/proyecto';
  private readonly REQUISITOS_ENDPOINT: string = '/requisitos';
  private readonly VERSIONES_ENDPOINT: string = '/versiones';
  private readonly VERSION_ENDPOINT: string = '/version';
  private readonly ETAPA_ENDPOINT: string = '/etapa';
  private readonly RECHAZAR_ENDPOINT: string = '/rechazar';
  private readonly TERMINO_PRCESO: string = '/termino-proceso';

  constructor(private httpService: HttpService) { }

  public consultarFasesPorProyectoPorId(id: number): Observable<FaseResumen[]>
  {
    return this.httpService.doGetById<FaseResumen[]>(`${environment.endpointIDR}${this.FASES_ENDPOINT}${this.PROYECTO_ENDPOINT}/`, id);
  }

  public consultarEtapaPorId(id: number): Observable<EtapaResumen>
  {
    return this.httpService.doGetById<EtapaResumen>(`${environment.endpointIDR}${this.FASES_ENDPOINT}${this.ETAPA_ENDPOINT}/`, id);
  }

  public aprobarEtapa(id: number): Observable<Respuesta<number>>
  {
    return this.httpService.doPutWithOutBody<Respuesta<number>>(`${environment.endpointIDR}${this.FASES_ENDPOINT}${this.APROBACION_ENDPOINT}/`, id);
  }

  public consultarVersionesPorEtapaId(id: number): Observable<VersionResumen[]>
  {
    return this.httpService.doGetById<VersionResumen[]>(`${environment.endpointIDR}${this.REQUISITOS_ENDPOINT}${this.VERSIONES_ENDPOINT}${this.ETAPA_ENDPOINT}/`, id);
  }

  public consultarVersionPorId(id: number): Observable<VersionResumen>
  {
    return this.httpService.doGetById<VersionResumen>(`${environment.endpointIDR}${this.REQUISITOS_ENDPOINT}${this.VERSIONES_ENDPOINT}/`, id);
  }

  public generarVersionInicial(id: number): Observable<Respuesta<number>>
  {
    return this.httpService.doPostWithOutBodyAndId<Respuesta<number>>(`${environment.endpointIDR}${this.REQUISITOS_ENDPOINT}${this.VERSIONES_ENDPOINT}/`, id);
  }

  public generarVersionFinal(id: number): Observable<Respuesta<number>>
  {
    return this.httpService.doPutWithOutBody<Respuesta<number>>(`${environment.endpointIDR}${this.REQUISITOS_ENDPOINT}${this.VERSIONES_ENDPOINT}/`, id);
  }

  public rechazarVersionPorId(motivoRechazoVersion: MotivoRechazoVersion, id: number): Observable<Respuesta<number>>
  {
    return this.httpService.doPut<MotivoRechazoVersion, Respuesta<number>>(`${environment.endpointIDR}${this.REQUISITOS_ENDPOINT}${this.VERSIONES_ENDPOINT}${this.RECHAZAR_ENDPOINT}/${id}`, motivoRechazoVersion);
  }

  public guardarRequisito(requisito: Requisito , id: number): Observable<Respuesta<number>>
  {
    return this.httpService.doPost<Requisito, Respuesta<number>>(`${environment.endpointIDR}${this.REQUISITOS_ENDPOINT}/${id}`, requisito);
  }

  public actualizarRequisito(requisito: Requisito , id: number): Observable<Respuesta<number>>
  {
    return this.httpService.doPut<Requisito, Respuesta<number>>(`${environment.endpointIDR}${this.REQUISITOS_ENDPOINT}/${id}`, requisito);
  }

  public eliminarRequisito(id: number): Observable<Respuesta<number>>
  {
    return this.httpService.doDelete<Respuesta<number>>(`${environment.endpointIDR}${this.REQUISITOS_ENDPOINT}/${id}`);
  }

  public consultarRequisitosPorVersionId(id: number, pagina: number, tamano?: number): Observable<any>
  {
    if(tamano === undefined){
      tamano = 10;
    }

    const params = new HttpParams().set('pagina', pagina).set('tamano', tamano);

    return this.httpService.doGetParameters<RequisitoResumen[]>(`${environment.endpointIDR}${this.REQUISITOS_ENDPOINT}${this.VERSION_ENDPOINT}/${id}`, params);
  }

  public consultarSiPrcesoDeIngenieriaDeRequisitosTermino(id: number): Observable<boolean>
  {
    return this.httpService.doGetById<boolean>(`${environment.endpointIDR}${this.REQUISITOS_ENDPOINT}${this.TERMINO_PRCESO}/`, id);
  }
}
