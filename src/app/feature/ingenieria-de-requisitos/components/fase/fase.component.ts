import { Component, Input } from '@angular/core';
import { FaseResumen } from '../../shared/model/fase-resumen.module';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-fase',
  templateUrl: './fase.component.html',
  styleUrls: ['./fase.component.scss']
})
export class FaseComponent {
  @Input() fase: FaseResumen;

  constructor(private router: Router) { }

  obtenerIdModalDescripcion(id: number): string {
    return 'descripcionModal' + id;
  }

  abrirEtapa(id: number): void {
    const navigationExtras: NavigationExtras = {
      state: {
        id: id
      }
    };

    this.router.navigate(['./ingenieria-de-requisitos/etapa'], navigationExtras);
  }
}
