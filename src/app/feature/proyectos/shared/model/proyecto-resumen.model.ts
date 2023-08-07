import { AprobacionProyectoResumen } from './aprobacion-proyecto-resumen.model';
import { EstadoProyectoResumen } from './estado-proyecto-resumen.model';
import { TipoConsultoriaResumen } from './tipo-consultoria-resumen.model';

export class ProyectoResumen {
  public id: number;
  public nombre: string;
  public descripcion: string;
  public estado: EstadoProyectoResumen;
  public aprobacionProyecto: AprobacionProyectoResumen;
  public tiposConsultoria: TipoConsultoriaResumen[];

  constructor(id?: number, nombre?: string, descripcion?: string, estado?: EstadoProyectoResumen, aprobacionProyecto?: AprobacionProyectoResumen, tiposConsultoria?: TipoConsultoriaResumen[]) {
    this.id = id || 0;
    this.nombre = nombre || '';
    this.descripcion = descripcion;
    this.estado = estado;
    this.aprobacionProyecto = aprobacionProyecto;
    this.tiposConsultoria = tiposConsultoria;
  }
}
