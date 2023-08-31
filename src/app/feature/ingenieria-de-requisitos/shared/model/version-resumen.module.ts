export class VersionResumen {
  public id: number;
  public esFinal: boolean;
  public fecha: string;
  public etapaID: number;


  constructor(id?: number, esFinal?: boolean, fecha?: string, etapaID?: number) {
    this.id = id || 0;
    this.esFinal = esFinal || false;
    this.fecha = fecha || '';
    this.etapaID = etapaID || 0;

  }
}
