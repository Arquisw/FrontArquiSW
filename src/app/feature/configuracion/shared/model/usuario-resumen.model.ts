import { Rol } from './rol.model';

export class UsuarioResumen {
  public id: number;
  public correo: string;
  public roles: Rol[];

  constructor(id?: number, correo?: string, roles?: Rol[]) {
    this.id = id || 0;
    this.correo = correo || '';
    this.roles = roles || [];
  }
}
