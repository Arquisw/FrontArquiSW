import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpService } from '../../../core/service/http.service';
import { Asociacion } from '@shared/model/asociacion/asociacion.model';
import { Respuesta } from '@shared/model/respuesta/respuesta.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AsociacionService {
  private readonly ASOCIACION_ENDPOINT: string = '/asociaciones';

  constructor(private http: HttpService) { }

  registrarAsociacion(asociacion: Asociacion, id: number): Observable<Respuesta<number>> {
    return this.http.doPost<Asociacion, Respuesta<number>>(`${environment.endpoint}${this.ASOCIACION_ENDPOINT}/${id}`, asociacion);
  }
}
