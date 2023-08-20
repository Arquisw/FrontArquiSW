import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fundamentacion',
  templateUrl: './fundamentacion.component.html',
  styleUrls: ['./fundamentacion.component.scss']
})
export class FundamentacionComponent implements OnInit {
  constructor(private viewportScroller: ViewportScroller) {}

  ngOnInit(): void {
    this.viewportScroller.scrollToPosition([0, 0]);
  }
}
