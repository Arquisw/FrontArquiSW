export class ContratoResumen {
  public id: number;
  public rutaArchivo: string;
  public asociacionId: number;

  constructor(id?: number, rutaArchivo?: string, asociacionId?: number) {
    this.id = id || 0;
    this.rutaArchivo = rutaArchivo || '';
    this.asociacionId = asociacionId;
  }
}
