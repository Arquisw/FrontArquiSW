export class PersonaResumen {
  public id: number;
  public nombre: string;
  public apellidos: string;
  public correo: string;

  constructor(id?: number, nombre?: string,  apellidos?: string,correo?: string) {
    this.id = id || 0;
    this.nombre = nombre || '';
    this.correo = correo || '';
    this.apellidos = apellidos || '';
  }
}
