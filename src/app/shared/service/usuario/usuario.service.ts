import { Injectable } from '@angular/core';
import { Respuesta } from '@shared/model/respuesta/respuesta.model';
import { UsuarioResumen } from '@shared/model/usuario/usuario-resumen.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpService } from '../../../core/service/http.service';
import { PersonaResumen } from '@shared/model/usuario/persona-resumen.model';
import { Usuario } from '@shared/model/usuario/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private readonly USUARIOS_ENDPOINT: string = '/usuarios';
  private readonly USUARIO_ENDPOINT: string = '/usuario';

  constructor(private http: HttpService) { }

  registrarUsuario(usuario: Usuario): Observable<Respuesta<number>> {
    return this.http.doPost<Usuario, Respuesta<number>>(`${environment.endpoint}${this.USUARIOS_ENDPOINT}`, usuario);
  }

  consultarPersona(id: number): Observable<PersonaResumen> {
    return this.http.doGet<PersonaResumen>(`${environment.endpoint}${this.USUARIOS_ENDPOINT}/${id}`);
  }

  consultarUsuario(correo: string): Observable<UsuarioResumen> {
    return this.http.doGet<UsuarioResumen>(`${environment.endpoint}${this.USUARIOS_ENDPOINT}${this.USUARIO_ENDPOINT}/${correo}`);
  }
}
