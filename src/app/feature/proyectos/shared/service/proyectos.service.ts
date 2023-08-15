import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import { Requerimientos } from '../model/requerimientos.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NecesidadResumen } from '../model/necesidad-resumen.model';
import { ProyectoResumen } from '../model/proyecto-resumen.model';
import { ProyectoRespuesta } from '../model/proyecto-respuesta.model';
import { AsociacionResumen } from 'src/app/feature/configuracion/shared/model/asociacion-resumen.model';
import { Postulacion } from '../model/postulacion.model';
import { PostulacionResumen } from '../model/postulacion-resumen.model';
import { SeleccionResumen } from '../model/seleccion-resumen.model';
import { Proyecto } from '../model/proyecto.model';
import { RequerimientosResumen } from '../model/requerimientos-resumen.model';

@Injectable()
export class ProyectosService {
  private readonly NECESIDADES_ENDPOINT: string = '/necesidades';
  private readonly REQUERIMIENTOS_ENDPOINT: string = '/requerimientos';
  private readonly ASOCIACION_ENDPOINT: string = '/asociacion';
  private readonly PROYECTOS_ENDPOINT: string = '/proyectos';
  private readonly PROYECTO_ENDPOINT: string = '/proyecto';
  private readonly NEGOCICADOS_ENDPOINT: string = '/negociados';
  private readonly ASOCIACIONES_ENDPOINT: string = '/asociaciones';
  private readonly POSTULACIONES_ENDPOINT: string = '/postulaciones';
  private readonly POSTULACION_ENDPOINT: string = '/postulacion';
  private readonly SELECCIONES_ENDPOINT: string = '/selecciones';
  private readonly SELECCION_ENDPOINT: string = '/seleccion';
  private readonly USUARIO_ENDPOINT: string = '/usuario';

  constructor(private httpService: HttpService) { }

  public guardar(proyecto: Proyecto , id: number): Observable<ProyectoRespuesta<number>>
  {
    return this.httpService.doPost<Proyecto, ProyectoRespuesta<number>>(`${environment.endpoint}${this.NECESIDADES_ENDPOINT}/${id}`, proyecto);
  }

  public guardarRequerimientos(requerimientos: Requerimientos, id: number): Observable<ProyectoRespuesta<number>>
  {
    return this.httpService.doPost<Requerimientos, ProyectoRespuesta<number>>(`${environment.endpoint}${this.NECESIDADES_ENDPOINT}${this.REQUERIMIENTOS_ENDPOINT}/${id}`, requerimientos);
  }

  public actualizar(proyecto: Proyecto, id: number): Observable<ProyectoRespuesta<number>>
  {
    return this.httpService.doPut<Proyecto, ProyectoRespuesta<number>>(`${environment.endpoint}${this.NECESIDADES_ENDPOINT}/${id}`, proyecto);
  }

  public actualizarRequerimientos(requerimientos: Requerimientos, id: number): Observable<ProyectoRespuesta<number>>
  {
    return this.httpService.doPut<Requerimientos, ProyectoRespuesta<number>>(`${environment.endpoint}${this.NECESIDADES_ENDPOINT}${this.REQUERIMIENTOS_ENDPOINT}/${id}`, requerimientos);
  }

  public eliminar(id: number): Observable<ProyectoRespuesta<number>>
  {
    return this.httpService.doDelete<ProyectoRespuesta<number>>(`${environment.endpoint}${this.NECESIDADES_ENDPOINT}/${id}`);
  }

  public consultarNecesidadPorId(id: number): Observable<NecesidadResumen>
  {
    return this.httpService.doGetById<NecesidadResumen>(`${environment.endpoint}${this.NECESIDADES_ENDPOINT}/`, id);
  }

  public consultarNecesidadesPorAsociacionId(id: number): Observable<NecesidadResumen[]>
  {
    return this.httpService.doGetById<NecesidadResumen[]>(`${environment.endpoint}${this.NECESIDADES_ENDPOINT}${this.ASOCIACION_ENDPOINT}/`, id);
  }

  public consultarProyectoPorId(id: number): Observable<ProyectoResumen>
  {
    return this.httpService.doGetById<ProyectoResumen>(`${environment.endpoint}${this.NECESIDADES_ENDPOINT}${this.PROYECTOS_ENDPOINT}/`, id);
  }

  public consultarRequerimientosPorNecesidadId(id: number): Observable<RequerimientosResumen>
  {
    return this.httpService.doGetById<RequerimientosResumen>(`${environment.endpoint}${this.NECESIDADES_ENDPOINT}${this.REQUERIMIENTOS_ENDPOINT}/`, id);
  }

  public consultarProyectosNegociados(): Observable<NecesidadResumen[]>
  {
    return this.httpService.doGet<NecesidadResumen[]>(`${environment.endpoint}${this.NECESIDADES_ENDPOINT}${this.PROYECTOS_ENDPOINT}${this.NEGOCICADOS_ENDPOINT}`);
  }

  public consultarAsociacionPorId(id: number): Observable<AsociacionResumen>
  {
    return this.httpService.doGetById<AsociacionResumen>(`${environment.endpoint}${this.ASOCIACIONES_ENDPOINT}/`, id);
  }

  public guardarPostulacion(postulacion: Postulacion): Observable<ProyectoRespuesta<number>>
  {
    return this.httpService.doPost<Postulacion, ProyectoRespuesta<number>>(`${environment.endpoint}${this.POSTULACIONES_ENDPOINT}`, postulacion);
  }

  public actualizarPostulacion(postulacion: Postulacion, id: number): Observable<ProyectoRespuesta<number>>
  {
    return this.httpService.doPut<Postulacion, ProyectoRespuesta<number>>(`${environment.endpoint}${this.POSTULACIONES_ENDPOINT}/${id}`, postulacion);
  }

  public consultarPostulacionesPorUsuarioId(id: number): Observable<PostulacionResumen[]>
  {
    return this.httpService.doGetById<PostulacionResumen[]>(`${environment.endpoint}${this.POSTULACIONES_ENDPOINT}${this.POSTULACION_ENDPOINT}${this.USUARIO_ENDPOINT}/`, id);
  }

  public consultarSeleccionesPorUsuarioId(id: number): Observable<SeleccionResumen[]>
  {
    return this.httpService.doGetById<SeleccionResumen[]>(`${environment.endpoint}${this.POSTULACIONES_ENDPOINT}${this.SELECCIONES_ENDPOINT}${this.SELECCION_ENDPOINT}${this.USUARIO_ENDPOINT}/`, id);
  }

  public consultarNecesidadPorProyectoId(id: number): Observable<NecesidadResumen>
  {
    return this.httpService.doGetById<NecesidadResumen>(`${environment.endpoint}${this.NECESIDADES_ENDPOINT}${this.PROYECTO_ENDPOINT}/`, id);
  }
}
