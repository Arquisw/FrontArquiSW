import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import { environment } from 'src/environments/environment';

@Injectable()

export class AdministradorService {

  constructor(private http: HttpService) { }

  consultarPeticionesUsuariosEliminar() {
    return this.http.doGet(environment.endpoint +'/usuarios/administrador');
  }

  consultarPersonaParaEliminar(id: number) {
    return this.http.doGet(environment.endpoint +'/usuarios/'+ id);
  }
}
