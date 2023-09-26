import { Component, OnInit } from '@angular/core';
import { MenuItem } from '@core/model/menu-item';
import { UsuarioResumen } from '@core/model/usuario-resumen.model';
import { GestionUsuarioService } from '@core/services/login.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  inicioSesion = false;
  noTieneCuentaActiva = false;
  correo = '';
  title = 'app-base';

  public menuItems: MenuItem[] = [
    { url: '/inicio', nombre: 'Inicio' },
    { url: '/fundamentacion', nombre: 'Fundamentacion' },
    { url: '/presentacion', nombre: 'Presentacion' },
    { url: '/acerca-de-nosotros', nombre: 'Acerca de Nosotros' },
    { url: '/proyectos', nombre: 'Proyectos' },
    { url: '/asociacion', nombre: 'Mi asociación' },
    { url: '/perfil', nombre: 'Mi Perfil' },
    { url: '/configuracion', nombre: 'Configuración' },
    { url: '/recuperar-clave', nombre: 'Recuperar Clave' },
  ];

  constructor(private gestionUsuarioService: GestionUsuarioService) {}

  ngOnInit(): void {
    this.inicioSesion = window.sessionStorage.getItem('Authorization') != null;

    if(this.inicioSesion) {
      const token = window.sessionStorage.getItem('Authorization');
      const tokenPayload = JSON.parse(atob(token.split('.')[1]));

      this.correo = tokenPayload.username;

      this.consultarUsuarioConCorreo(this.correo);
    }
  }

  consultarUsuarioConCorreo(correo: string): void {
    this.gestionUsuarioService.consultarUsuario(correo).subscribe((response: UsuarioResumen) => {
      if(!response.activado) {
        this.noTieneCuentaActiva = true;
      } else {
        this.noTieneCuentaActiva = false;
      }
    });
  }
}
