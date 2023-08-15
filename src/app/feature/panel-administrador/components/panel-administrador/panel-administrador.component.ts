import { Component } from '@angular/core';
import { MenuItem } from '@core/modelo/menu-item';

@Component({
  selector: 'app-panel-administrador',
  templateUrl: './panel-administrador.component.html',
  styleUrls: ['./panel-administrador.component.scss']
})
export class PanelAdministradorComponent {
  public menuItems: MenuItem[] = [
    { url: './eliminaciones', nombre: 'Administrar Eliminaciones' },
    { url: './aprobaciones', nombre: 'Aprobaciones' },
    { url: './contrataciones', nombre: 'Contrataciones' },
    { url: './roles', nombre: 'Roles y Permisos' },
    { url: './postulaciones', nombre: 'Postulaciones' }
  ];
}
