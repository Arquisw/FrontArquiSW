export class Login {
  public correo: string;
  public clave: string;

  constructor(correo?: string, clave?: string) {
    this.correo = correo || '';
    this.clave = clave || '';
  }
}
