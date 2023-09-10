export class VersionResumen {
  public id: number;
  public esFinal: boolean;
  public estaRechazada: boolean;
  public motivoRechazo: string;
  public fecha: string;
  public etapaID: number;

  constructor(id?: number, esFinal?: boolean, estaRechazada?: boolean, motivoRechazo?: string, fecha?: string, etapaID?: number) {
    this.id = id || 0;
    this.esFinal = esFinal || false;
    this.estaRechazada = estaRechazada || false;
    this.motivoRechazo = motivoRechazo || '';
    this.fecha = fecha || '';
    this.etapaID = etapaID || 0;
  }
}
