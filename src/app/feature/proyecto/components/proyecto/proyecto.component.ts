import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.scss']
})
export class ProyectoComponent implements OnInit {
  proyectoId: number;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.proyectoId = parseInt(this.route.snapshot.paramMap.get('id'), 10);
  }
}
