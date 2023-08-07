export class AprobacionProyectoResumen {
  public id: number;
  public ingenieria: boolean;
  public liderDeEquipo: boolean;
  public directorDeProyecto: boolean;

  constructor(id?: number, ingenieria?: boolean, liderDeEquipo?: boolean, directorDeProyecto?: boolean) {
    this.id = id || 0;
    this.ingenieria = ingenieria || false;
    this.liderDeEquipo = liderDeEquipo || false;
    this.directorDeProyecto = directorDeProyecto || false;
  }
}
