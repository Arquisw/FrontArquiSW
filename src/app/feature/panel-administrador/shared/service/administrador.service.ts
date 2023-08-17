import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import { environment } from 'src/environments/environment';
import { RolResumen } from '../model/rol-resumen.model';
import { Observable } from 'rxjs';
import { Rol } from '../model/rol.model';
import { PanelAdministradorRespuesta } from '../model/panel-administrador-respuesta.model';
import { NecesidadResumen } from 'src/app/feature/proyectos/shared/model/necesidad-resumen.model';
import { PostulacionResumen } from 'src/app/feature/proyectos/shared/model/postulacion-resumen.model';
import { ProyectoResumen } from 'src/app/feature/proyectos/shared/model/proyecto-resumen.model';
import { Seleccion } from '../model/seleccion.model';
import { MotivoRechazoPostulacion } from '../model/motivo-rechazo-postulacion.module';

@Injectable()

export class AdministradorService {
  private readonly USUARIOS_ENDPOINT: string = '/usuarios';
  private readonly ROLES_ENDPOINT: string = '/roles';
  private readonly NECESIDADES_ENDPOINT: string = '/necesidades';
  private readonly PROYECTOS_ENDPOINT: string = '/proyectos';
  private readonly NEGOCICADOS_ENDPOINT: string = '/negociados';
  private readonly POSTULACIONES_ENDPOINT: string = '/postulaciones';
  private readonly ADMINISTRADOR_ENDPOINT: string = '/administrador';
  private readonly SELECCIONAR_ENDPOINT: string = '/seleccionar';
  private readonly RECHAZAR_ENDPOINT: string = '/rechazar';
  private readonly PROYECTO_ENDPOINT: string = '/proyecto';

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

  consultarNecesidadesAprobadas() {
    return this.http.doGet(environment.endpoint +'/necesidades/proyectos');
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

  public consultarProyectosNegociados(): Observable<NecesidadResumen[]>
  {
    return this.http.doGet<NecesidadResumen[]>(`${environment.endpoint}${this.NECESIDADES_ENDPOINT}${this.PROYECTOS_ENDPOINT}${this.NEGOCICADOS_ENDPOINT}`);
  }

  public consultarPostulacionesPorProyectoId(id: number): Observable<PostulacionResumen[]>
  {
    return this.http.doGetById<PostulacionResumen[]>(`${environment.endpoint}${this.POSTULACIONES_ENDPOINT}${this.PROYECTO_ENDPOINT}/`, id);
  }

  public consultarProyectoPorId(id: number): Observable<ProyectoResumen>
  {
    return this.http.doGetById<ProyectoResumen>(`${environment.endpoint}${this.NECESIDADES_ENDPOINT}${this.PROYECTOS_ENDPOINT}/`, id);
  }

  public seleccionarUsuario(seleccion: Seleccion, id: number): Observable<PanelAdministradorRespuesta<number>>
  {
    return this.http.doPut<Seleccion, PanelAdministradorRespuesta<number>>(`${environment.endpoint}${this.POSTULACIONES_ENDPOINT}${this.ADMINISTRADOR_ENDPOINT}${this.SELECCIONAR_ENDPOINT}/${id}`, seleccion);
  }

  public rechazarUsuario(motivoRechazo: MotivoRechazoPostulacion, id: number): Observable<PanelAdministradorRespuesta<number>>
  {
    return this.http.doPut<MotivoRechazoPostulacion, PanelAdministradorRespuesta<number>>(`${environment.endpoint}${this.POSTULACIONES_ENDPOINT}${this.ADMINISTRADOR_ENDPOINT}${this.RECHAZAR_ENDPOINT}/${id}`, motivoRechazo);
  }

  aprobarNecesidad(id: number) {
    return this.http.doGet(environment.endpoint +'/necesidades/administrador/aprobar/'+ id);
  }

  declinarNecesidad(id: number, razonRechazo) {
    return this.http.doPut(environment.endpoint +'/necesidades/administrador/rechazar/'+ id, razonRechazo);
  }

  consultarContrato(id: number) {
    return this.http.doGet(environment.endpoint +'/contratos/'+ id);
  }

  guardarContrato(id: number, contrato) {
    return this.http.doPost(environment.endpoint +'/contratos/'+ id, contrato);
  }

  actualizarContrato(id: number, contrato) {
    return this.http.doPut(environment.endpoint +'/contratos/'+ id, contrato);
  }


}
