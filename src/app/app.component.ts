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
    { url: '/acercaNosotros', nombre: 'Acerca de Nosotros' },

  ];


}
