export class PropetarioProyecto {
  public necesidadId: number;
  public usuarioId: number;

  constructor(necesidadId?: number, usuarioId?: number) {
    this.necesidadId = necesidadId || 0;
    this.usuarioId = usuarioId || 0;
  }
}
