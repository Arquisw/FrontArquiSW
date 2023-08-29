import { EtapaResumen } from './etapa-resumen.module';

export class FaseResumen {
  public id: number;
  public nombre: string;
  public descripcion: string;
  public etapas: EtapaResumen[];
  public proyectoID: number;

  constructor(id?: number, nombre?: string, descripcion?: string, etapas?: EtapaResumen[], proyectoID?: number) {
    this.id = id || 0;
    this.nombre = nombre || '';
    this.descripcion = descripcion || '';
    this.etapas = etapas || [];
    this.proyectoID = proyectoID || 0;
  }
}
