import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';
import { Observable } from 'rxjs';
import { NecesidadResumen } from 'src/app/feature/proyectos/shared/model/necesidad-resumen.model';
import { SeleccionResumen } from 'src/app/feature/proyectos/shared/model/seleccion-resumen.model';
import { environment } from 'src/environments/environment';
import { ContratoResumen } from '../model/contrato-resumen-model';
import { RequerimientosResumen } from 'src/app/feature/proyectos/shared/model/requerimientos-resumen.model';
import { ProyectoRespuesta } from 'src/app/feature/proyectos/shared/model/proyecto-respuesta.model';
import { PropetarioProyecto } from '../model/propetario-proyecto.model';

@Injectable()
export class ProyectoService {
  private readonly NECESIDADES_ENDPOINT: string = '/necesidades';
  private readonly REQUERIMIENTOS_ENDPOINT: string = '/requerimientos';
  private readonly POSTULACIONES_ENDPOINT: string = '/postulaciones';
  private readonly SELECCIONES_ENDPOINT: string = '/selecciones';
  private readonly CONTRATOS_ENDPOINT: string = '/contratos';
  private readonly APROBACION_ENDPOINT: string = '/aprobacion';
  private readonly INGENIERIA_ENDPOINT: string = '/ingenieria';
  private readonly LIDER_DE_EQUIPO_ENDPOINT: string = '/liderDeEquipo';
  private readonly DIRECTOR_DE_PROYECTO_ENDPOINT: string = '/directorDeProyecto';
  private readonly ES_PROPETARIO_DEL_PROYECTO_ENDPOINT: string = '/esPropetarioDelProyecto';

  constructor(private httpService: HttpService) { }

  public consultarNecesidadPorId(id: number): Observable<NecesidadResumen> {
    return this.httpService.doGetById<NecesidadResumen>(`${environment.endpoint}${this.NECESIDADES_ENDPOINT}/`, id);
  }

  public consultarSeleccionesPorProyectoId(id: number): Observable<SeleccionResumen[]> {
    return this.httpService.doGetById<SeleccionResumen[]>(`${environment.endpoint}${this.POSTULACIONES_ENDPOINT}${this.SELECCIONES_ENDPOINT}/`, id);
  }

  public consultarContratoPorNecesidadId(id: number): Observable<ContratoResumen> {
    return this.httpService.doGetById<ContratoResumen>(`${environment.endpoint}${this.CONTRATOS_ENDPOINT}/`, id);
  }

  public consultarRequerimientosPorNecesidadId(id: number): Observable<RequerimientosResumen>
  {
    return this.httpService.doGetById<RequerimientosResumen>(`${environment.endpoint}${this.NECESIDADES_ENDPOINT}${this.REQUERIMIENTOS_ENDPOINT}/`, id);
  }

  public aprobarProyectoPorRolIngenieria(id: number): Observable<ProyectoRespuesta<number>>
  {
    return this.httpService.doPutWithOutBody<ProyectoRespuesta<number>>(`${environment.endpoint}${this.NECESIDADES_ENDPOINT}${this.APROBACION_ENDPOINT}${this.INGENIERIA_ENDPOINT}/`, id);
  }

  public aprobarProyectoPorRolLiderDeEquipo(id: number): Observable<ProyectoRespuesta<number>>
  {
    return this.httpService.doPutWithOutBody<ProyectoRespuesta<number>>(`${environment.endpoint}${this.NECESIDADES_ENDPOINT}${this.APROBACION_ENDPOINT}${this.LIDER_DE_EQUIPO_ENDPOINT}/`, id);
  }

  public aprobarProyectoPorRolDirectorDeProyecto(id: number): Observable<ProyectoRespuesta<number>>
  {
    return this.httpService.doPutWithOutBody<ProyectoRespuesta<number>>(`${environment.endpoint}${this.NECESIDADES_ENDPOINT}${this.APROBACION_ENDPOINT}${this.DIRECTOR_DE_PROYECTO_ENDPOINT}/`, id);
  }

  public esPropetarioDelProyecto(propetarioProyecto: PropetarioProyecto): Observable<ProyectoRespuesta<boolean>>
  {
    return this.httpService.doPost<PropetarioProyecto, ProyectoRespuesta<boolean>>(`${environment.endpoint}${this.NECESIDADES_ENDPOINT}${this.ES_PROPETARIO_DEL_PROYECTO_ENDPOINT}`, propetarioProyecto);
  }
}
