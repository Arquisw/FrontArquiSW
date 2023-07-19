export class Rol {
  public nombre: string;
  public leer: boolean;
  public escribir: boolean;
  public actualizar: boolean;
  public eliminar: boolean;

  constructor(nombre?: string, leer?: boolean, escribir?: boolean, actualizar?: boolean, eliminar?: boolean) {
    this.nombre = nombre || '';
    this.leer = leer || false;
    this.escribir = escribir || false;
    this.actualizar = actualizar || false;
    this.eliminar = eliminar || false;
  }
}
