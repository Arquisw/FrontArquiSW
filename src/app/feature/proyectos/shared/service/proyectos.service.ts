import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';
import { Requerimientos } from '../model/requerimientos.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NecesidadResumen } from '../../../../shared/model/proyecto/necesidad-resumen.model';
import { Postulacion } from '../model/postulacion.model';
import { PostulacionResumen } from '../model/postulacion-resumen.model';
import { SeleccionResumen } from '../model/seleccion-resumen.model';
import { Proyecto } from '../model/proyecto.model';
import { Respuesta } from '@shared/model/respuesta/respuesta.model';

@Injectable()
export class ProyectosService {
  private readonly NECESIDADES_ENDPOINT: string = '/necesidades';
  private readonly REQUERIMIENTOS_ENDPOINT: string = '/requerimientos';
  private readonly ASOCIACION_ENDPOINT: string = '/asociacion';
  private readonly PROYECTO_ENDPOINT: string = '/proyecto';
  private readonly POSTULACIONES_ENDPOINT: string = '/postulaciones';
  private readonly POSTULACION_ENDPOINT: string = '/postulacion';
  private readonly SELECCIONES_ENDPOINT: string = '/selecciones';
  private readonly SELECCION_ENDPOINT: string = '/seleccion';
  private readonly USUARIO_ENDPOINT: string = '/usuario';

  constructor(private httpService: HttpService) { }

  public guardar(proyecto: Proyecto , id: number): Observable<Respuesta<number>>
  {
    return this.httpService.doPost<Proyecto, Respuesta<number>>(`${environment.endpoint}${this.NECESIDADES_ENDPOINT}/${id}`, proyecto);
  }

  public guardarRequerimientos(requerimientos: Requerimientos, id: number): Observable<Respuesta<number>>
  {
    return this.httpService.doPost<Requerimientos, Respuesta<number>>(`${environment.endpoint}${this.NECESIDADES_ENDPOINT}${this.REQUERIMIENTOS_ENDPOINT}/${id}`, requerimientos);
  }

  public actualizar(proyecto: Proyecto, id: number): Observable<Respuesta<number>>
  {
    return this.httpService.doPut<Proyecto, Respuesta<number>>(`${environment.endpoint}${this.NECESIDADES_ENDPOINT}/${id}`, proyecto);
  }

  public actualizarRequerimientos(requerimientos: Requerimientos, id: number): Observable<Respuesta<number>>
  {
    return this.httpService.doPut<Requerimientos, Respuesta<number>>(`${environment.endpoint}${this.NECESIDADES_ENDPOINT}${this.REQUERIMIENTOS_ENDPOINT}/${id}`, requerimientos);
  }

  public eliminar(id: number): Observable<Respuesta<number>>
  {
    return this.httpService.doDelete<Respuesta<number>>(`${environment.endpoint}${this.NECESIDADES_ENDPOINT}/${id}`);
  }

  public consultarNecesidadesPorAsociacionId(id: number): Observable<NecesidadResumen[]>
  {
    return this.httpService.doGetById<NecesidadResumen[]>(`${environment.endpoint}${this.NECESIDADES_ENDPOINT}${this.ASOCIACION_ENDPOINT}/`, id);
  }

  public guardarPostulacion(postulacion: Postulacion): Observable<Respuesta<number>>
  {
    return this.httpService.doPost<Postulacion, Respuesta<number>>(`${environment.endpoint}${this.POSTULACIONES_ENDPOINT}`, postulacion);
  }

  public actualizarPostulacion(postulacion: Postulacion, id: number): Observable<Respuesta<number>>
  {
    return this.httpService.doPut<Postulacion, Respuesta<number>>(`${environment.endpoint}${this.POSTULACIONES_ENDPOINT}/${id}`, postulacion);
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
