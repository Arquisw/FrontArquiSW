import { EstadoNecesidadResumen } from './estado-necesidad-resumen.model';
import { ProyectoResumen } from './proyecto-resumen.model';

export class NecesidadResumen {
  public id: number;
  public estado: EstadoNecesidadResumen;
  public proyecto: ProyectoResumen;

  constructor(id?: number, estado?: EstadoNecesidadResumen, proyecto?: ProyectoResumen) {
    this.id = id || 0;
    this.estado = estado;
    this.proyecto = proyecto;
  }
}
