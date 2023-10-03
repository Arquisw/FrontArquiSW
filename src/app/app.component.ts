import { Component, OnInit } from '@angular/core';
import { MenuItem } from '@core/model/menu-item.model';
import { UsuarioResumen } from '@shared/model/usuario/usuario-resumen.model';
import { UsuarioService } from '@shared/service/usuario/usuario.service';

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
    { url: '/fundamentacion', nombre: 'Fundamentación' },
    { url: '/presentacion', nombre: 'Presentación' },
    { url: '/acerca-de-nosotros', nombre: 'Acerca de nosotros' },
    { url: '/proyectos', nombre: 'Proyectos' },
    { url: '/asociacion', nombre: 'Mi empresa o asociación' },
    { url: '/perfil', nombre: 'Mi perfil' },
    { url: '/configuracion', nombre: 'Configuración' },
    { url: '/recuperar-clave', nombre: 'Recuperar clave' },
    { url: '/panel-administrador', nombre: 'Panel de administrador' },
  ];

  constructor(private usuarioService: UsuarioService) {}

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
    this.usuarioService.consultarUsuarioPorCorreo(correo).subscribe((response: UsuarioResumen) => {
      if(!response.activado) {
        this.noTieneCuentaActiva = true;
      } else {
        this.noTieneCuentaActiva = false;
      }
    });
  }
}
