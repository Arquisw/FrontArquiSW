import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from '@core/model/menu-item.model';
import { TokenService } from '@shared/service/token/token.service';

@Component({
  selector: 'app-panel-administrador',
  templateUrl: './panel-administrador.component.html',
  styleUrls: ['./panel-administrador.component.scss']
})
export class PanelAdministradorComponent implements OnInit {
  public menuItems: MenuItem[] = [
    { url: './eliminaciones', nombre: 'Administrar eliminaciones' },
    { url: './aprobaciones', nombre: 'Aprobaciones' },
    { url: './contrataciones', nombre: 'Contrataciones' },
    { url: './roles', nombre: 'Roles y permisos' },
    { url: './postulaciones', nombre: 'Postulaciones' }
  ];

  constructor(private tokenService: TokenService, private viewportScroller: ViewportScroller) {}

  ngOnInit(): void {
    this.tokenService.actualizarToken();
    
    this.viewportScroller.scrollToPosition([0, 0]);
  }
}
