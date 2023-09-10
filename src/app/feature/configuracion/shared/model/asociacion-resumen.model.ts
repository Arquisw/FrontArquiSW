export class AsociacionResumen {
  public id: number;
  public nombre: string;
  public nit: string;
  public numeroContacto: string;
  public nombreContacto: string;
  public usuarioId: number;

  constructor(id?: number, nombre?: string, nit?: string, numeroContacto?: string, nombreContacto?: string, usuarioId?: number) {
    this.id = id || 0;
    this.nombre = nombre || '';
    this.nit = nit || '';
    this.numeroContacto = numeroContacto || '';
    this.nombreContacto = nombreContacto || '';
    this.usuarioId = usuarioId || 0;
  }
}
