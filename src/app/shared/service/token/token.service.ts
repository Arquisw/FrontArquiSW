import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class TokenService {
  private readonly TOKEN_ENDPOINT: string = '/token';
  private readonly ACTUALIZAR_TOKEN_ENDPOINT: string = '/actualizar';

  constructor(private http: HttpService) { }

  actualizarToken(): void {
    this.consumirServicioActualizarToken().subscribe(() => {});
  }

  consumirServicioActualizarToken(): Observable<void> {
    return this.http.doGet<void>(`${environment.endpoint}${this.TOKEN_ENDPOINT}${this.ACTUALIZAR_TOKEN_ENDPOINT}`);
  }
}
