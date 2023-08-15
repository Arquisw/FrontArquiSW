export class Rol {
  public leer: boolean;
  public escribir: boolean;
  public actualizar: boolean;
  public eliminar: boolean;

  constructor(leer?: boolean, escribir?: boolean, actualizar?: boolean, eliminar?: boolean) {
    this.leer = leer || false;
    this.escribir = escribir || false;
    this.actualizar = actualizar || false;
    this.eliminar = eliminar || false;
  }
}
