import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import { environment } from 'src/environments/environment';

@Injectable()

export class MiPerfilService {

  constructor(private http: HttpService) { }

  consultarPersona(id: number) {
    return this.http.doGet(environment.endpoint +'/usuarios/'+ id);
  }

  guardarHojaDeVida(id: number, hojaDeVida) {
    return this.http.doPost(environment.endpoint +'/usuarios/hojadevida/'+ id, hojaDeVida);
  }

  consultarHojaDeVida(id: number) {
    return this.http.doGet(environment.endpoint +'/usuarios/hojadevida/'+ id);
  }
}
