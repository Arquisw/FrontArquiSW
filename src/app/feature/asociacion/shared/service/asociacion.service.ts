import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import { environment } from 'src/environments/environment';

@Injectable()

export class AsociacionService {

  constructor(private http: HttpService) { }

  consultarAsociacionPorUsuario(id: number) {
    return this.http.doGet(environment.endpoint +'/asociaciones/'+ id);
  }

  consultarAsociacion(id: number) {
    return this.http.doGet(environment.endpoint +'/asociaciones/asociacion/'+ id);
  }
}
