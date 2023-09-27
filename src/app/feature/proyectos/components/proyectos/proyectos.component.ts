import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from '@core/model/menu-item.model';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.scss']
})
export class ProyectosComponent implements OnInit {
  public menuItems: MenuItem[] = [];

  public menuItemsSinAsociacion: MenuItem[] = [
    { url: './buscar', nombre: 'Buscar' },
    { url: './proyectos-seleccionados', nombre: 'Mis Proyectos' },
    { url: './proyectos-postulados', nombre: 'Proyectos Postulados' }
  ];

  public menuItemsConAsociacion: MenuItem[] = [
    { url: './buscar', nombre: 'Buscar' },
    { url: './mis-proyectos', nombre: 'Mis Proyectos' },
  ];

  public menuItemsAdministrador: MenuItem[] = [
    { url: './buscar', nombre: 'Buscar' }
  ];

  tieneAsociacion = false;
  authorities: string[] = [];

  constructor(private viewportScroller: ViewportScroller) {}

  ngOnInit(): void {
    const token = window.sessionStorage.getItem('Authorization');
    const tokenPayload = JSON.parse(atob(token.split('.')[1]));
    this.authorities = tokenPayload.authorities.split(',');

    this.viewportScroller.scrollToPosition([0, 0]);

    this.filtrarMenu();
  }

  filtrarMenu(): void {
    this.menuItems = this.menuItemsSinAsociacion;

    this.authorities.forEach(authority => {
      if (authority === 'ROLE_ASOCIACION') {
        this.menuItems = this.menuItemsConAsociacion;
      } else if(authority === 'ROLE_ADMINISTRADOR') {
        this.menuItems = this.menuItemsAdministrador;
      }
    });
  }
}
