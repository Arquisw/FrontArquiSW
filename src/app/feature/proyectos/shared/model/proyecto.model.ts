import { TipoConsultoria } from './tipo-consultoria.model';

export class Proyecto {
  public nombre: string;
  public descripcion: string;
  public tiposConsultoria: TipoConsultoria[];

  constructor(nombre?: string, descripcion?: string, tiposConsultoria?: TipoConsultoria[]) {
    this.nombre = nombre || '';
    this.descripcion = descripcion || '';
    this.tiposConsultoria = tiposConsultoria;
  }
}
