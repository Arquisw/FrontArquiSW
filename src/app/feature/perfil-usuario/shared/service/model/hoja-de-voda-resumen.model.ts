export class HojaDeVidaResumen {
  public id: number;
  public ruta: string;

  constructor(id?: number, ruta?: string) {
    this.id = id || 0;
    this.ruta = ruta || '';
  }
}
