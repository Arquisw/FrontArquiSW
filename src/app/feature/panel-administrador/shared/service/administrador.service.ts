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

  consultarPeticionesNecesidadAEliminar() {
    return this.http.doGet(environment.endpoint +'/necesidades/administrador');
  }

  consultarPersonaParaEliminar(id: number) {
    return this.http.doGet(environment.endpoint +'/usuarios/'+ id);
  }

  consultarAsociacionParaEliminar(id: number) {
    return this.http.doGet(environment.endpoint +'/asociaciones/asociacion/'+ id);
  }

  consultarNecesidadParaEliminar(id: number) {
    return this.http.doGet(environment.endpoint +'/necesidades/'+ id);
  }

  consultarNecesidadesPendienteAprobacion() {
    return this.http.doGet(environment.endpoint +'/necesidades');
  }

  eliminarAsociacion(id: number) {
    return this.http.doDelete(environment.endpoint +'/asociaciones/administrador/'+ id);
  }

  eliminarPersona(id: number) {
    return this.http.doDelete(environment.endpoint +'/usuarios/administrador/'+ id);
  }

  eliminarProyecto(id: number) {
    return this.http.doDelete(environment.endpoint +'/necesidades/administrador/'+ id);
  }
}
