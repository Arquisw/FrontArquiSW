import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from '@core/model/menu-item.model';

@Component({
  selector: 'app-panel-administrador',
  templateUrl: './panel-administrador.component.html',
  styleUrls: ['./panel-administrador.component.scss']
})
export class PanelAdministradorComponent implements OnInit {
  public menuItems: MenuItem[] = [
    { url: './eliminaciones', nombre: 'Administrar Eliminaciones' },
    { url: './aprobaciones', nombre: 'Aprobaciones' },
    { url: './contrataciones', nombre: 'Contrataciones' },
    { url: './roles', nombre: 'Roles y Permisos' },
    { url: './postulaciones', nombre: 'Postulaciones' }
  ];

  constructor(private viewportScroller: ViewportScroller) {}

  ngOnInit(): void {
    this.viewportScroller.scrollToPosition([0, 0]);
  }
}
