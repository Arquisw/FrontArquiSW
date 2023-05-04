import { Injectable } from '@angular/core';
import { Usuario } from '@core/modelo/usuario.modelo';
import { environment } from 'src/environments/environment';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class GestionUsuarioService {

  constructor(private http: HttpService) { }

  validarLogin(user: Usuario) {
    window.sessionStorage.setItem("userdetails",JSON.stringify(user));
    return this.http.doGet(environment.endpoint+"/login");
  }

  registrarUsuario(user:Usuario){
    return this.http.doPost(environment.endpoint+"/usuarios",user);
  }
}
