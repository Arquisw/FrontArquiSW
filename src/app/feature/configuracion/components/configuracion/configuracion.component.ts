import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from '@core/model/menu-item.model';
import { TokenService } from '@shared/service/token/token.service';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.scss']
})
export class ConfiguracionComponent implements OnInit {
  tieneAsociacion = false;
  authorities: string[] = [];
  miCuentaMenu: MenuItem = { url: './usuario', nombre: 'Mi cuenta' };
  miAsociacionMenu: MenuItem = { url: './asociacion', nombre: 'Mi empresa o asociación' };

  constructor(private tokenService: TokenService, private viewportScroller: ViewportScroller) {}

  ngOnInit(): void {
    this.tokenService.actualizarToken();
    this.posicionarPaginaAlInicio();

    const token = window.sessionStorage.getItem('Authorization');
    const tokenPayload = JSON.parse(atob(token.split('.')[1]));
    this.authorities = tokenPayload.authorities.split(',');

    this.filtrarMenu();
  }

  posicionarPaginaAlInicio(): void {
    this.viewportScroller.scrollToPosition([0, 0]);
  }

  filtrarMenu(): void {
    this.authorities.forEach(authority => {
      if (authority === 'ROLE_ASOCIACION') {
        this.tieneAsociacion = true;
      }
    });
  }
}
