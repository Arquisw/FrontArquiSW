export class Asociacion {
  public nombre: string;
  public nit: string;
  public numeroContacto: string;

  constructor(nombre?: string, nit?: string, numeroContacto?: string) {
    this.nombre = nombre || '';
    this.nit = nit || '';
    this.numeroContacto = numeroContacto || '';
  }
}
