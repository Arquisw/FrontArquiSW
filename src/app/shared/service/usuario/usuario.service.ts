import { Injectable } from '@angular/core';
import { UsuarioResumen } from '@shared/model/usuario/usuario-resumen.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpService } from '../../../core/service/http.service';
import { PersonaResumen } from '@shared/model/usuario/persona-resumen.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private readonly USUARIOS_ENDPOINT: string = '/usuarios';
  private readonly USUARIO_ENDPOINT: string = '/usuario';

  constructor(private http: HttpService) { }

  consultarPersonaPorId(id: number): Observable<PersonaResumen> {
    return this.http.doGet<PersonaResumen>(`${environment.endpoint}${this.USUARIOS_ENDPOINT}/${id}`);
  }

  consultarUsuarioPorCorreo(correo: string): Observable<UsuarioResumen> {
    return this.http.doGet<UsuarioResumen>(`${environment.endpoint}${this.USUARIOS_ENDPOINT}${this.USUARIO_ENDPOINT}/${correo}`);
  }
}
