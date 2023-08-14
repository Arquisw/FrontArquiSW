import { EstadoNecesidadResumen } from './estado-necesidad-resumen.model';
import { ProyectoResumen } from './proyecto-resumen.model';

export class NecesidadResumen {
  public id: number;
  public motivoRechazo: string;
  public estado: EstadoNecesidadResumen;
  public proyecto: ProyectoResumen;

  constructor(id?: number, motivoRechazo?: string, estado?: EstadoNecesidadResumen, proyecto?: ProyectoResumen) {
    this.id = id || 0;
    this.motivoRechazo = motivoRechazo || '';
    this.estado = estado;
    this.proyecto = proyecto;
  }
}
