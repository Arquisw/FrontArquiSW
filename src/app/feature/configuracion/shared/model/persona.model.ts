export class Persona {
  public nombre: string;
  public apellidos: string;
  public correo: string;

  constructor(nombre?: string, apellidos?: string, correo?: string) {
    this.nombre = nombre || '';
    this.correo = correo || '';
    this.apellidos = apellidos || '';
  }
}
