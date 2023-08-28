import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import { Observable } from 'rxjs';
import { ProyectoResumen } from 'src/app/feature/proyectos/shared/model/proyecto-resumen.model';
import { environment } from 'src/environments/environment';

@Injectable()

export class IngenieriaDeRequisitosService {
  private readonly NECESIDADES_ENDPOINT: string = '/necesidades';
  private readonly PROYECTOS_ENDPOINT: string = '/proyectos';

  constructor(private httpService: HttpService) { }

  public consultarProyectoPorId(id: number): Observable<ProyectoResumen>
  {
    return this.httpService.doGetById<ProyectoResumen>(`${environment.endpoint}${this.NECESIDADES_ENDPOINT}${this.PROYECTOS_ENDPOINT}/`, id);
  }
}
