import { TipoRequisito } from './tipo-requisito.module';

export class Requisito {
  public nombre: string;
  public descripcion: string;
  public tipoRequisito: TipoRequisito;

  constructor(nombre?: string, descripcion?: string, tipoRequisito?: TipoRequisito) {
    this.nombre = nombre || '';
    this.descripcion = descripcion || '';
    this.tipoRequisito = tipoRequisito;
  }
}
