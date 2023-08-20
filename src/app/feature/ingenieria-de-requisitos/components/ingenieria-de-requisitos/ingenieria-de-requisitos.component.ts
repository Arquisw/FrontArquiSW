import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ingenieria-de-requisitos',
  templateUrl: './ingenieria-de-requisitos.component.html',
  styleUrls: ['./ingenieria-de-requisitos.component.scss']
})
export class IngenieriaDeRequisitosComponent implements OnInit {
  proyectoId = 0;

  constructor(private viewportScroller: ViewportScroller) { }

  ngOnInit(): void {
    const params = history.state;
    this.proyectoId = params.id;

    this.viewportScroller.scrollToPosition([0, 0]);
  }
}
