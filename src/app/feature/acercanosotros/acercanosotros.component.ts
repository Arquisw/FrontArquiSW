import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-acercanosotros',
  templateUrl: './acercanosotros.component.html',
  styleUrls: ['./acercanosotros.component.scss']
})
export class AcercanosotrosComponent implements OnInit {
  constructor(private viewportScroller: ViewportScroller) {}

  ngOnInit(): void {
    this.posicionarPaginaAlInicio();
  }

  posicionarPaginaAlInicio(): void {
    this.viewportScroller.scrollToPosition([0, 0]);
  }
}

