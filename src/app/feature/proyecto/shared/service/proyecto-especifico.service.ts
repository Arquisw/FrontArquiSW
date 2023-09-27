import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';
import { Observable } from 'rxjs';
import { SeleccionResumen } from 'src/app/feature/proyectos/shared/model/seleccion-resumen.model';
import { environment } from 'src/environments/environment';
import { ContratoResumen } from '../../../../shared/model/proyecto/contrato-resumen-model';
import { PropetarioProyecto } from '../model/propetario-proyecto.model';
import { Respuesta } from '@shared/model/respuesta/respuesta.model';

@Injectable()
export class ProyectoEspecificoService {
  private readonly NECESIDADES_ENDPOINT: string = '/necesidades';
  private readonly POSTULACIONES_ENDPOINT: string = '/postulaciones';
  private readonly SELECCIONES_ENDPOINT: string = '/selecciones';
  private readonly CONTRATOS_ENDPOINT: string = '/contratos';
  private readonly APROBACION_ENDPOINT: string = '/aprobacion';
  private readonly INGENIERIA_ENDPOINT: string = '/ingenieria';
  private readonly LIDER_DE_EQUIPO_ENDPOINT: string = '/liderDeEquipo';
  private readonly DIRECTOR_DE_PROYECTO_ENDPOINT: string = '/directorDeProyecto';
  private readonly ES_PROPETARIO_DEL_PROYECTO_ENDPOINT: string = '/esPropetarioDelProyecto';

  constructor(private httpService: HttpService) { }

  public consultarSeleccionesPorProyectoId(id: number): Observable<SeleccionResumen[]> {
    return this.httpService.doGetById<SeleccionResumen[]>(`${environment.endpoint}${this.POSTULACIONES_ENDPOINT}${this.SELECCIONES_ENDPOINT}/`, id);
  }

  public consultarContratoPorNecesidadId(id: number): Observable<ContratoResumen> {
    return this.httpService.doGetById<ContratoResumen>(`${environment.endpoint}${this.CONTRATOS_ENDPOINT}/`, id);
  }

  public aprobarProyectoPorRolIngenieria(id: number): Observable<Respuesta<number>>
  {
    return this.httpService.doPutWithOutBody<Respuesta<number>>(`${environment.endpoint}${this.NECESIDADES_ENDPOINT}${this.APROBACION_ENDPOINT}${this.INGENIERIA_ENDPOINT}/`, id);
  }

  public aprobarProyectoPorRolLiderDeEquipo(id: number): Observable<Respuesta<number>>
  {
    return this.httpService.doPutWithOutBody<Respuesta<number>>(`${environment.endpoint}${this.NECESIDADES_ENDPOINT}${this.APROBACION_ENDPOINT}${this.LIDER_DE_EQUIPO_ENDPOINT}/`, id);
  }

  public aprobarProyectoPorRolDirectorDeProyecto(id: number): Observable<Respuesta<number>>
  {
    return this.httpService.doPutWithOutBody<Respuesta<number>>(`${environment.endpoint}${this.NECESIDADES_ENDPOINT}${this.APROBACION_ENDPOINT}${this.DIRECTOR_DE_PROYECTO_ENDPOINT}/`, id);
  }

  public esPropetarioDelProyecto(propetarioProyecto: PropetarioProyecto): Observable<Respuesta<boolean>>
  {
    return this.httpService.doPost<PropetarioProyecto, Respuesta<boolean>>(`${environment.endpoint}${this.NECESIDADES_ENDPOINT}${this.ES_PROPETARIO_DEL_PROYECTO_ENDPOINT}`, propetarioProyecto);
  }
}
