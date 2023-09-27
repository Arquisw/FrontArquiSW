import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';
import { environment } from 'src/environments/environment';
import { RolResumen } from '../model/rol-resumen.model';
import { Observable } from 'rxjs';
import { Rol } from '../model/rol.model';
import { NecesidadResumen } from '@shared/model/proyecto/necesidad-resumen.model';
import { PostulacionResumen } from 'src/app/feature/proyectos/shared/model/postulacion-resumen.model';
import { Seleccion } from '../model/seleccion.model';
import { MotivoRechazoPostulacion } from '../model/motivo-rechazo-postulacion.model';
import { Respuesta } from '@shared/model/respuesta/respuesta.model';
import { PeticionEliminacionPersonaResumen } from '../model/peticion-eliminacion-persona-resumen.model';
import { PeticionEliminacionAsociacionResumen } from '../model/peticion-eliminacion-asociacion-resumen.model';
import { PeticionEliminacionNecesidadResumen } from '../model/peticion-eliminacion-necesidad-resumen.model';
import { MotivoRechazoNecesidad } from '../model/motivo-rechazo-necesidad.model';
import { ContratoResumen } from '@shared/model/proyecto/contrato-resumen-model';
import { Contrato } from '../model/contrato.model';

@Injectable()

export class AdministradorService {
  private readonly USUARIOS_ENDPOINT: string = '/usuarios';
  private readonly ASOCIACIONES_ENDPOINT: string = '/asociaciones';
  private readonly ROLES_ENDPOINT: string = '/roles';
  private readonly NECESIDADES_ENDPOINT: string = '/necesidades';
  private readonly PROYECTOS_ENDPOINT: string = '/proyectos';
  private readonly NEGOCICADOS_ENDPOINT: string = '/negociados';
  private readonly POSTULACIONES_ENDPOINT: string = '/postulaciones';
  private readonly ADMINISTRADOR_ENDPOINT: string = '/administrador';
  private readonly SELECCIONAR_ENDPOINT: string = '/seleccionar';
  private readonly APROBAR_ENDPOINT: string = '/aprobar';
  private readonly CONTRATOS_ENDPOINT: string = '/contratos';
  private readonly RECHAZAR_ENDPOINT: string = '/rechazar';
  private readonly PROYECTO_ENDPOINT: string = '/proyecto';

  constructor(private http: HttpService) { }

  consultarPeticionesUsuariosEliminar(): Observable<PeticionEliminacionPersonaResumen[]> {
    return this.http.doGet<PeticionEliminacionPersonaResumen[]>(`${environment.endpoint}${this.USUARIOS_ENDPOINT}${this.ADMINISTRADOR_ENDPOINT}`);
  }

  consultarPeticionesAsociacionAEliminar(): Observable<PeticionEliminacionAsociacionResumen[]> {
    return this.http.doGet<PeticionEliminacionAsociacionResumen[]>(`${environment.endpoint}${this.ASOCIACIONES_ENDPOINT}${this.ADMINISTRADOR_ENDPOINT}`);
  }

  consultarPeticionesNecesidadAEliminar(): Observable<PeticionEliminacionNecesidadResumen[]> {
    return this.http.doGet<PeticionEliminacionNecesidadResumen[]>(`${environment.endpoint}${this.NECESIDADES_ENDPOINT}${this.ADMINISTRADOR_ENDPOINT}`);
  }

  consultarNecesidadesPendienteAprobacion(): Observable<NecesidadResumen[]> {
    return this.http.doGet<NecesidadResumen[]>(`${environment.endpoint}${this.NECESIDADES_ENDPOINT}`);
  }

  consultarNecesidadesAprobadas(): Observable<NecesidadResumen[]> {
    return this.http.doGet<NecesidadResumen[]>(`${environment.endpoint}${this.NECESIDADES_ENDPOINT}${this.PROYECTOS_ENDPOINT}`);
  }

  eliminarAsociacion(id: number): Observable<Respuesta<number>> {
    return this.http.doDelete<Respuesta<number>>(`${environment.endpoint}${this.ASOCIACIONES_ENDPOINT}${this.ADMINISTRADOR_ENDPOINT}${id}`);
  }

  eliminarPersona(id: number): Observable<Respuesta<number>> {
    return this.http.doDelete<Respuesta<number>>(`${environment.endpoint}${this.USUARIOS_ENDPOINT}${this.ADMINISTRADOR_ENDPOINT}${id}`);
  }

  eliminarProyecto(id: number): Observable<Respuesta<number>> {
    return this.http.doDelete<Respuesta<number>>(`${environment.endpoint}${this.NECESIDADES_ENDPOINT}${this.ADMINISTRADOR_ENDPOINT}${id}`);
  }

  public consultarRoles(): Observable<RolResumen[]>
  {
    return this.http.doGet<RolResumen[]>(`${environment.endpoint}${this.USUARIOS_ENDPOINT}${this.ROLES_ENDPOINT}`);
  }

  public actualizarRol(rol: Rol, id: number): Observable<Respuesta<number>>
  {
    return this.http.doPut<Rol, Respuesta<number>>(`${environment.endpoint}${this.USUARIOS_ENDPOINT}${this.ROLES_ENDPOINT}/${id}`, rol);
  }

  public consultarProyectosNegociados(): Observable<NecesidadResumen[]>
  {
    return this.http.doGet<NecesidadResumen[]>(`${environment.endpoint}${this.NECESIDADES_ENDPOINT}${this.PROYECTOS_ENDPOINT}${this.NEGOCICADOS_ENDPOINT}`);
  }

  public consultarPostulacionesPorProyectoId(id: number): Observable<PostulacionResumen[]>
  {
    return this.http.doGetById<PostulacionResumen[]>(`${environment.endpoint}${this.POSTULACIONES_ENDPOINT}${this.PROYECTO_ENDPOINT}/`, id);
  }

  public seleccionarUsuario(seleccion: Seleccion, id: number): Observable<Respuesta<number>>
  {
    return this.http.doPut<Seleccion, Respuesta<number>>(`${environment.endpoint}${this.POSTULACIONES_ENDPOINT}${this.ADMINISTRADOR_ENDPOINT}${this.SELECCIONAR_ENDPOINT}/${id}`, seleccion);
  }

  public rechazarUsuario(motivoRechazo: MotivoRechazoPostulacion, id: number): Observable<Respuesta<number>>
  {
    return this.http.doPut<MotivoRechazoPostulacion, Respuesta<number>>(`${environment.endpoint}${this.POSTULACIONES_ENDPOINT}${this.ADMINISTRADOR_ENDPOINT}${this.RECHAZAR_ENDPOINT}/${id}`, motivoRechazo);
  }

  aprobarNecesidad(id: number): Observable<Respuesta<number>> {
    return this.http.doGet<Respuesta<number>>(`${environment.endpoint}${this.NECESIDADES_ENDPOINT}${this.ADMINISTRADOR_ENDPOINT}${this.APROBAR_ENDPOINT}${id}`);
  }

  declinarNecesidad(id: number, razonRechazo: MotivoRechazoNecesidad): Observable<Respuesta<number>> {
    return this.http.doPut<MotivoRechazoNecesidad, Respuesta<number>>(`${environment.endpoint}${this.NECESIDADES_ENDPOINT}${this.ADMINISTRADOR_ENDPOINT}${this.RECHAZAR_ENDPOINT}${id}`, razonRechazo);
  }

  consultarContrato(id: number): Observable<ContratoResumen> {
    return this.http.doGet<ContratoResumen>(`${environment.endpoint}${this.CONTRATOS_ENDPOINT}${id}`);
  }

  guardarContrato(id: number, contrato: Contrato): Observable<Respuesta<number>> {
    return this.http.doPost<Contrato, Respuesta<number>>(`${environment.endpoint}${this.CONTRATOS_ENDPOINT}${id}`, contrato);
  }

  actualizarContrato(id: number, contrato: Contrato): Observable<Respuesta<number>> {
    return this.http.doPut<Contrato, Respuesta<number>>(`${environment.endpoint}${this.CONTRATOS_ENDPOINT}${id}`, contrato);
  }
}
