export class Clave {
  public claveAntigua: string;
  public claveNueva: string;

  constructor(claveAntigua?: string, claveNueva?: string) {
    this.claveAntigua = claveAntigua || '';
    this.claveNueva = claveNueva || '';
  }
}
