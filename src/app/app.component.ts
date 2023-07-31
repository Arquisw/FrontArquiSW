import { Component } from '@angular/core';
import { MenuItem } from '@core/modelo/menu-item';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
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
}
