import { TipoRequisitoResumen } from './tipo-requisito-resumen.module';

export class RequisitoResumen {
  public id: number;
  public nombre: string;
  public descripcion: string;
  public tipoRequisito: TipoRequisitoResumen;
  public versionID: number;

  constructor(id?: number, nombre?: string, descripcion?: string, tipoRequisito?: TipoRequisitoResumen, versionID?: number) {
    this.id = id || 0;
    this.nombre = nombre || '';
    this.descripcion = descripcion || '';
    this.tipoRequisito = tipoRequisito;
    this.versionID = versionID || 0;
  }
}
