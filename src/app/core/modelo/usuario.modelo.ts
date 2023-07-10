export class Usuario{

  public id: number;
  public nombre: string;
  public apellidos: string;
  public correo: string;
  public clave: string;


  constructor(id?: number, nombre?: string,  apellidos?: string,correo?: string,  clave?: string){
    this.id = id || 0;
    this.nombre = nombre || '';
    this.correo = correo || '';
    this.apellidos = apellidos || '';
    this.clave = clave || '';
  }
}
