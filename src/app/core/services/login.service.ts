import { Injectable } from '@angular/core';
import { Usuario } from '@core/model/usuario.modelo';
import { environment } from 'src/environments/environment';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';
import { UsuarioResumen } from '@core/model/usuario-resumen.model';

@Injectable({
  providedIn: 'root'
})
export class GestionUsuarioService {

  constructor(private http: HttpService) { }

  validarLogin(user: Usuario) {
    window.sessionStorage.setItem('userdetails',JSON.stringify(user));

    return this.http.doGet(environment.endpoint+'/login');
  }

  registrarUsuario(user: Usuario) {
    return this.http.doPost(environment.endpoint+'/usuarios',user);
  }

  consultarPersona(id: number) {
    return this.http.doGet(environment.endpoint+'/usuarios/' + id);
  }

  consultarUsuario(correo: string): Observable<UsuarioResumen> {
    return this.http.doGet<UsuarioResumen>(environment.endpoint + '/usuarios/usuario/' + correo);
  }
}
