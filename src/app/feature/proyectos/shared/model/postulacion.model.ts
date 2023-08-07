export class Postulacion {
  public roles: string[];
  public proyectoID: number;
  public usuarioID: number;

  constructor(roles?: string[], proyectoID?: number, usuarioID?: number, ) {
    this.roles = roles;
    this.proyectoID = proyectoID || 0;
    this.usuarioID = usuarioID || 0;
  }
}
