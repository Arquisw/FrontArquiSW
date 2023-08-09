import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import { environment } from 'src/environments/environment';

@Injectable()

export class AdministradorService {

  constructor(private http: HttpService) { }

  consultarPeticionesUsuariosEliminar() {
    return this.http.doGet(environment.endpoint +'/usuarios/administrador');
  }

  consultarPeticionesAsociacionAEliminar() {
    return this.http.doGet(environment.endpoint +'/asociaciones/administrador');
  }

  consultarPersonaParaEliminar(id: number) {
    return this.http.doGet(environment.endpoint +'/usuarios/'+ id);
  }

  consultarAsociacionParaEliminar(id: number) {
    return this.http.doGet(environment.endpoint +'/asociaciones/asociacion/'+ id);
  }
}
