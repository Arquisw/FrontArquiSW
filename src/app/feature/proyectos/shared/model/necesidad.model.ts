import { Proyecto } from './proyecto.model';

export class Necesidad {
  public rutaArchivo: string;
  public proyecto: Proyecto;

  constructor(rutaArchivo?: string, proyecto?: Proyecto) {
    this.rutaArchivo = rutaArchivo || '';
    this.proyecto = proyecto;
  }
}
