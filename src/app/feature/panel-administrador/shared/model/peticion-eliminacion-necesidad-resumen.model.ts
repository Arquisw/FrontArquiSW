export class PeticionEliminacionNecesidadResumen {
  public id: number;
  public necesidad: number;

  constructor(id?: number, necesidad?: number) {
    this.id = id || 0;
    this.necesidad = necesidad || 0;
  }
}
