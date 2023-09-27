export class PeticionEliminacionPersonaResumen {
  public id: number;
  public usuario: number;

  constructor(id?: number, usuario?: number) {
    this.id = id || 0;
    this.usuario = usuario || 0;
  }
}
