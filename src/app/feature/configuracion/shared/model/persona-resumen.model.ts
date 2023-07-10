import { List } from "cypress/types/lodash";
import { Rol } from "./rol.model";

export class PersonaResumen {
  public id: number;
  public nombre: string;
  public apellidos: string;
  public correo: string;
  public roles: List<Rol>;

  constructor(id?: number, nombre?: string,  apellidos?: string,correo?: string, roles?: List<Rol>) {
    this.id = id || 0;
    this.nombre = nombre || '';
    this.correo = correo || '';
    this.apellidos = apellidos || '';
    this.roles = roles || new Array();
  }
}
