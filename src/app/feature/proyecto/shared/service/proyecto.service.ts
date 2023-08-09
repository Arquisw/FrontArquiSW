import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import { Observable } from 'rxjs';
import { NecesidadResumen } from 'src/app/feature/proyectos/shared/model/necesidad-resumen.model';
import { SeleccionResumen } from 'src/app/feature/proyectos/shared/model/seleccion-resumen.model';
import { environment } from 'src/environments/environment';
import { ContratoResumen } from '../model/contrato-resumen-model';

@Injectable()
export class ProyectoService {
  private readonly NECESIDADES_ENDPOINT: string = '/necesidades';
  private readonly POSTULACIONES_ENDPOINT: string = '/postulaciones';
  private readonly SELECCIONES_ENDPOINT: string = '/selecciones';
  private readonly CONTRATOS_ENDPOINT: string = '/contratos';

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
}
