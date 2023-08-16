export class PostulacionResumen {
  public id: number;
  public seleccionado: boolean;
  public rechazado: boolean;
  public motivoDelRechazo: string;
  public nombreDelUsuario: string;
  public correoDelUsuario: string;
  public fecha: string;
  public roles: string[];
  public proyectoID: number;
  public usuarioID: number;

  constructor(id?: number, seleccionado?: boolean, rechazado?: boolean, motivoDelRechazo?: string, fecha?: string, roles?: string[], proyectoID?: number, usuarioID?: number, ) {
    this.id = id || 0;
    this.seleccionado = seleccionado || false;
    this.rechazado = rechazado || false;
    this.motivoDelRechazo = motivoDelRechazo || '';
    this.fecha = fecha || '';
    this.roles = roles;
    this.proyectoID = proyectoID || 0;
    this.usuarioID = usuarioID || 0;
  }
}
