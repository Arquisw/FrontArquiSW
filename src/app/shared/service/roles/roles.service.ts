import { Injectable } from '@angular/core';

@Injectable()
export class RolesService {
  roles: Map<string, string> = new Map([
    ['ROLE_DIRECTOR_PROYECTO', 'Director de proyecto'],
    ['ROLE_PARTE_INTERESADA', 'Parte interesada'],
    ['ROLE_EQUIPO_DESARROLLO', 'Equipo de desarrollo'],
    ['ROLE_INGENIERIA', 'Ingeniería'],
    ['ROLE_ARQUITECTURA', 'Arquitectura'],
    ['ROLE_ANALISTA', 'Analista'],
    ['ROLE_LIDER_DE_EQUIPO', 'Líder de equipo'],
    ['ROLE_PATROCINADOR', 'Patrocinador'],
  ]);

  constructor() {}

  public obtenerNombreDelRol(codigoRol: string): string {
    return this.roles.get(codigoRol);
  }
}
