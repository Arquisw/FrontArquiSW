import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Codigo } from '../model/codigo.model';
import { RecuperarClave } from '../model/recuperar-clave.model';
import { RecuperarClaveResponse } from '../model/response.model';

@Injectable()
export class RecuperarClaveService {
  private readonly USUARIOS_ENDPOINT: string = '/usuarios';
  private readonly USUARIOS_RECUPERACION_ENDPOINT: string = '/recuperacion';
  private readonly VALIDAR_CODIGO_ENDPOINT: string = '/validarCodigo';
  private readonly RECUPERAR_CLAVE_ENDPOINT: string = '/recuperarClave';

  constructor(private httpService: HttpService) { }

  public iniciarRecuperacionDeLaClave(correo: string): Observable<RecuperarClaveResponse<number>> {
    return this.httpService.doPostWithOutBody<RecuperarClaveResponse<number>>(`${environment.endpoint}${this.USUARIOS_ENDPOINT}${this.USUARIOS_RECUPERACION_ENDPOINT}/`, correo);
  }

  public validarCodigoParaRecuperarClave(codigo: Codigo, correo: string): Observable<RecuperarClaveResponse<boolean>> {
    return this.httpService.doPost<Codigo, RecuperarClaveResponse<boolean>>(`${environment.endpoint}${this.USUARIOS_ENDPOINT}${this.USUARIOS_RECUPERACION_ENDPOINT}${this.VALIDAR_CODIGO_ENDPOINT}/${correo}`, codigo);
  }

  public recuperarClave(clave: RecuperarClave, correo: string): Observable<RecuperarClaveResponse<number>> {
    return this.httpService.doPost<RecuperarClave, RecuperarClaveResponse<number>>(`${environment.endpoint}${this.USUARIOS_ENDPOINT}${this.USUARIOS_RECUPERACION_ENDPOINT}${this.RECUPERAR_CLAVE_ENDPOINT}/${correo}`, clave);
  }
}
