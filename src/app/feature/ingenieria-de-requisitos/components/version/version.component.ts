import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IngenieriaDeRequisitosService } from '../../shared/service/ingenieria-de-requisitos.service';
import { VersionResumen } from '../../shared/model/version-resumen.module';

@Component({
  selector: 'app-version',
  templateUrl: './version.component.html',
  styleUrls: ['./version.component.scss']
})
export class VersionComponent implements OnInit {
  versionId = 0;
  versionResumen: VersionResumen;

  constructor(private viewportScroller: ViewportScroller, private ingenieriaDeRequisitosService: IngenieriaDeRequisitosService) {}

  ngOnInit(): void {
    this.posicionarPaginaAlInicio();

    const params = history.state;
    this.versionId = params.id;

    this.consultarVersionPorId(this.versionId);
  }

  posicionarPaginaAlInicio(): void {
    this.viewportScroller.scrollToPosition([0, 0]);
  }

  consultarVersionPorId(id: number): void {
    this.ingenieriaDeRequisitosService.consultarVersionPorId(id).subscribe((response) => {
      this.versionResumen = response;
    });
  }
}
