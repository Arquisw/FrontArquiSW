export class EtapaResumen {
  public id: number;
  public nombre: string;
  public descripcion: string;
  public completada: boolean;

  constructor(id?: number, nombre?: string, descripcion?: string, completada?: boolean) {
    this.id = id || 0;
    this.nombre = nombre || '';
    this.descripcion = descripcion || '';
    this.completada = completada || false;
  }
}
