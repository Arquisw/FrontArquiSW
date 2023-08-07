import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import { Necesidad } from '../model/necesidad.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NecesidadResumen } from '../model/necesidad-resumen.model';
import { ProyectoResumen } from '../model/proyecto-resumen.model';
import { ProyectoRespuesta } from '../model/proyecto-respuesta.model';
import { AsociacionResumen } from 'src/app/feature/configuracion/shared/model/asociacion-resumen.model';
import { Postulacion } from '../model/postulacion.model';
import { PostulacionResumen } from '../model/postulacion-resumen.model';
import { SeleccionResumen } from '../model/seleccion-resumen.model';

@Injectable({
  providedIn: 'root'
})
export class ProyectosService {
  private readonly NECESIDADES_ENDPOINT: string = '/necesidades';
  private readonly ASOCIACION_ENDPOINT: string = '/asociacion';
  private readonly APROBACION_ENDPOINT: string = '/aprobacion';
  private readonly INGENIERIA_ENDPOINT: string = '/ingenieria';
  private readonly LIDER_DE_EQUIPO_ENDPOINT: string = '/liderDeEquipo';
  private readonly DIRECTOR_DE_PROYECTO_ENDPOINT: string = '/directorDeProyecto';
  private readonly PROYECTOS_ENDPOINT: string = '/proyectos';
  private readonly PROYECTO_ENDPOINT: string = '/proyectos';
  private readonly ASOCIACIONES_ENDPOINT: string = '/asociaciones';
  private readonly POSTULACIONES_ENDPOINT: string = '/postulaciones';
  private readonly POSTULACION_ENDPOINT: string = '/postulacion';
  private readonly SELECCIONES_ENDPOINT: string = '/selecciones';
  private readonly SELECCION_ENDPOINT: string = '/seleccion';
  private readonly USUARIO_ENDPOINT: string = '/usuario';


  constructor(private httpService: HttpService) { }

  public guardar(necesidad: Necesidad , id: number): Observable<ProyectoRespuesta<number>>
  {
    return this.httpService.doPost<Necesidad, ProyectoRespuesta<number>>(`${environment.endpoint}${this.NECESIDADES_ENDPOINT}/${id}`, necesidad);
  }

  public actualizar(necesidad: Necesidad, id: number): Observable<ProyectoRespuesta<number>>
  {
    return this.httpService.doPut<Necesidad, ProyectoRespuesta<number>>(`${environment.endpoint}${this.NECESIDADES_ENDPOINT}/${id}`, necesidad);
  }

  public eliminar(id: number): Observable<ProyectoRespuesta<number>>
  {
    return this.httpService.doDelete<ProyectoRespuesta<number>>(`${environment.endpoint}${this.NECESIDADES_ENDPOINT}/${id}`);
  }

  public aprobarProyectoPorRolIngenieria(id: number): Observable<ProyectoRespuesta<number>>
  {
    return this.httpService.doRequestMapping<ProyectoRespuesta<number>>(`${environment.endpoint}${this.NECESIDADES_ENDPOINT}${this.APROBACION_ENDPOINT}${this.INGENIERIA_ENDPOINT}`, id);
  }

  public aprobarProyectoPorRolLiderDeEquipo(id: number): Observable<ProyectoRespuesta<number>>
  {
    return this.httpService.doRequestMapping<ProyectoRespuesta<number>>(`${environment.endpoint}${this.NECESIDADES_ENDPOINT}${this.APROBACION_ENDPOINT}${this.LIDER_DE_EQUIPO_ENDPOINT}`, id);
  }

  public aprobarProyectoPorRolDirectorDeProyecto(id: number): Observable<ProyectoRespuesta<number>>
  {
    return this.httpService.doRequestMapping<ProyectoRespuesta<number>>(`${environment.endpoint}${this.NECESIDADES_ENDPOINT}${this.APROBACION_ENDPOINT}${this.DIRECTOR_DE_PROYECTO_ENDPOINT}`, id);
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

  public consultarProyectos(): Observable<NecesidadResumen[]>
  {
    return this.httpService.doGet<NecesidadResumen[]>(`${environment.endpoint}${this.NECESIDADES_ENDPOINT}${this.PROYECTOS_ENDPOINT}/`);
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

  public consultarPostulacionPorUsuarioId(id: number): Observable<PostulacionResumen>
  {
    return this.httpService.doGetById<PostulacionResumen>(`${environment.endpoint}${this.POSTULACIONES_ENDPOINT}${this.POSTULACION_ENDPOINT}${this.USUARIO_ENDPOINT}/`, id);
  }

  public consultarSeleccionPorUsuarioId(id: number): Observable<SeleccionResumen>
  {
    return this.httpService.doGetById<SeleccionResumen>(`${environment.endpoint}${this.POSTULACIONES_ENDPOINT}${this.SELECCIONES_ENDPOINT}${this.SELECCION_ENDPOINT}${this.USUARIO_ENDPOINT}/`, id);
  }

  public consultarNecesidadPorProyectoId(id: number): Observable<NecesidadResumen>
  {
    return this.httpService.doGetById<NecesidadResumen>(`${environment.endpoint}${this.NECESIDADES_ENDPOINT}${this.PROYECTO_ENDPOINT}/`, id);
  }
}
