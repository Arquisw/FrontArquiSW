import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/service/http.service';
import { AsociacionResumen } from '@shared/model/asociacion/asociacion-resumen.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AsociacionService {
  private readonly ASOCIACIONES_ENDPOINT: string = '/asociaciones';
  private readonly ASOCIACION_ENDPOINT: string = '/asociacion';

  constructor(private http: HttpService) { }

  public consultarAsociacionPorUsuarioId(id: number): Observable<AsociacionResumen> {
    return this.http.doGetById<AsociacionResumen>(`${environment.endpoint}${this.ASOCIACIONES_ENDPOINT}/`, id);
  }

  consultarAsociacionPorId(id: number): Observable<AsociacionResumen> {
    return this.http.doGetById<AsociacionResumen>(`${environment.endpoint}${this.ASOCIACIONES_ENDPOINT}${this.ASOCIACION_ENDPOINT}/`, id);
  }
}
