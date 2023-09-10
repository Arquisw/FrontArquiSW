import { EstadoNecesidadResumen } from './estado-necesidad-resumen.model';
import { ProyectoResumen } from './proyecto-resumen.model';

export class NecesidadResumen {
  public id: number;
  public motivoRechazo: string;
  public estado: EstadoNecesidadResumen;
  public proyecto: ProyectoResumen;
  public asociacion: number;

  constructor(id?: number, motivoRechazo?: string, estado?: EstadoNecesidadResumen, proyecto?: ProyectoResumen, asociacion?: number) {
    this.id = id || 0;
    this.motivoRechazo = motivoRechazo || '';
    this.estado = estado;
    this.proyecto = proyecto;
    this.asociacion = asociacion || 0;
  }
}
