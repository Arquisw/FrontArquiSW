import { Rol } from './rol.model';

export class PersonaResumen {
  public id: number;
  public nombre: string;
  public apellidos: string;
  public correo: string;
  public roles: Rol[];

  constructor(id?: number, nombre?: string,  apellidos?: string,correo?: string, roles?: Rol[]) {
    this.id = id || 0;
    this.nombre = nombre || '';
    this.correo = correo || '';
    this.apellidos = apellidos || '';
    this.roles = roles || [];
  }
}
