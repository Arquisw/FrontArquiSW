import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import { environment } from 'src/environments/environment';
import { RolResumen } from '../model/rol-resumen.model';
import { Observable } from 'rxjs';
import { Rol } from '../model/rol.model';
import { PanelAdministradorRespuesta } from '../model/panel-administrador-respuesta.model';

@Injectable()

export class AdministradorService {
  private readonly USUARIOS_ENDPOINT: string = '/usuarios';
  private readonly ROLES_ENDPOINT: string = '/roles';

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

  public consultarRoles(): Observable<RolResumen[]>
  {
    return this.http.doGet<RolResumen[]>(`${environment.endpoint}${this.USUARIOS_ENDPOINT}${this.ROLES_ENDPOINT}`);
  }

  public actualizarRol(rol: Rol, id: number): Observable<PanelAdministradorRespuesta<number>>
  {
    return this.http.doPut<Rol, PanelAdministradorRespuesta<number>>(`${environment.endpoint}${this.USUARIOS_ENDPOINT}${this.ROLES_ENDPOINT}/${id}`, rol);
  }
}
