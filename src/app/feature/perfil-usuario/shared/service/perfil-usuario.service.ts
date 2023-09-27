import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';
import { Respuesta } from '@shared/model/respuesta/respuesta.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HojaDeVida } from './model/hoja-de-vida.model';
import { HojaDeVidaResumen } from './model/hoja-de-voda-resumen.model';

@Injectable()

export class PerfilUsuarioService {
  private readonly USUARIOS_ENDPOINT: string = '/usuarios';
  private readonly HOJA_DE_VIDA_ENDPOINT: string = '/hojadevida';

  constructor(private http: HttpService) { }

  guardarHojaDeVida(id: number, hojaDeVida: HojaDeVida): Observable<Respuesta<number>> {
    return this.http.doPost<HojaDeVida, Respuesta<number>>(`${environment.endpoint}${this.USUARIOS_ENDPOINT}${this.HOJA_DE_VIDA_ENDPOINT}/${id}`, hojaDeVida);
  }

  consultarHojaDeVida(id: number): Observable<HojaDeVidaResumen> {
    return this.http.doGetById<HojaDeVidaResumen>(`${environment.endpoint}${this.USUARIOS_ENDPOINT}${this.HOJA_DE_VIDA_ENDPOINT}/`, id);
  }

  actualizarHojaDeVida(id: number, hojaDeVida: HojaDeVida) {
    return this.http.doPut(`${environment.endpoint}${this.USUARIOS_ENDPOINT}${this.HOJA_DE_VIDA_ENDPOINT}/${id}`, hojaDeVida);
  }
}
