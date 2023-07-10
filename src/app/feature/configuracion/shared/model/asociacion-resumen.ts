export class AsociacionResumen {
  public id: number;
  public nombre: string;
  public nit: string;
  public numeroContacto: string;
  public nombreContacto: string;

  constructor(id?: number, nombre?: string, nit?: string, numeroContacto?: string, nombreContacto?: string) {
    this.id = id || 0;
    this.nombre = nombre || '';
    this.nit = nit || '';
    this.numeroContacto = numeroContacto || '';
    this.nombreContacto = nombreContacto || '';
  }
}
