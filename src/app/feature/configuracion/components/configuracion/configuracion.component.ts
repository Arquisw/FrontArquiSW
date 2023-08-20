import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.scss']
})
export class ConfiguracionComponent implements OnInit {
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
    this.authorities.forEach(authority => {
      if (authority === 'ROLE_ASOCIACION') {
        this.tieneAsociacion = true;
      }
    });
  }
}
