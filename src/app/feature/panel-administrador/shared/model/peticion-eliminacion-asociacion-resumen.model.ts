export class PeticionEliminacionAsociacionResumen {
  public id: number;
  public asociacion: number;

  constructor(id?: number, asociacion?: number) {
    this.id = id || 0;
    this.asociacion = asociacion || 0;
  }
}
