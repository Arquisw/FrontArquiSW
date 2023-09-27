export class RequerimientosResumen {
  public id: number;
  public rutaArchivo: string;

  constructor(id?: number, rutaArchivo?: string) {
    this.id = id || 0;
    this.rutaArchivo = rutaArchivo || '';
  }
}
