export class Usuario {
  public nombre: string;
  public apellidos: string;
  public correo: string;
  public clave: string;

  constructor(nombre?: string, apellidos?: string, correo?: string, clave?: string){
    this.nombre = nombre || '';
    this.apellidos = apellidos || '';
    this.correo = correo || '';
    this.clave = clave || '';
  }
}
