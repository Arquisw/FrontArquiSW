export class SeleccionResumen {
  public id: number;
  public nombreDelUsuario: string;
  public fecha: string;
  public roles: string[];
  public proyectoID: number;
  public usuarioID: number;

  constructor(id?: number, nombreDelUsuario?: string, fecha?: string, roles?: string[], proyectoID?: number, usuarioID?: number, ) {
    this.id = id || 0;
    this.nombreDelUsuario = nombreDelUsuario || '';
    this.fecha = fecha || '';
    this.roles = roles;
    this.proyectoID = proyectoID || 0;
    this.usuarioID = usuarioID || 0;
  }
}
