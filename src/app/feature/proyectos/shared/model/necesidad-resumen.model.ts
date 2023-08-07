import { EstadoNecesidadResumen } from './estado-necesidad-resumen.model';
import { ProyectoResumen } from './proyecto-resumen.model';

export class NecesidadResumen {
  public id: number;
  public rutaArchivo: string;
  public estado: EstadoNecesidadResumen;
  public proyecto: ProyectoResumen;

  constructor(id?: number, rutaArchivo?: string, estado?: EstadoNecesidadResumen, proyecto?: ProyectoResumen) {
    this.id = id || 0;
    this.rutaArchivo = rutaArchivo || '';
    this.estado = estado;
    this.proyecto = proyecto;
  }
}
