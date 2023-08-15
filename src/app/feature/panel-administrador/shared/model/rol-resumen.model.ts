export class RolResumen {
  public id: number;
  public nombre: string;
  public leer: boolean;
  public escribir: boolean;
  public actualizar: boolean;
  public eliminar: boolean;

  constructor(id?: number, nombre?: string, leer?: boolean, escribir?: boolean, actualizar?: boolean, eliminar?: boolean) {
    this.id = id || 0;
    this.nombre = nombre || '';
    this.leer = leer || false;
    this.escribir = escribir || false;
    this.actualizar = actualizar || false;
    this.eliminar = eliminar || false;
  }
}
