import { RolResumen } from './rol-resumen.model';

export class UsuarioResumen {
  public id: number;
  public correo: string;
  public activado: boolean;
  public roles: RolResumen[];

  constructor(id?: number, correo?: string, activado?: boolean, roles?: RolResumen[]){
    this.id = id || 0;
    this.correo = correo || '';
    this.activado = activado || false;
    this.roles = roles || [];
  }
}
