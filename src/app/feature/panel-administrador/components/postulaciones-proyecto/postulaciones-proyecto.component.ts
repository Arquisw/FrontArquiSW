import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-postulaciones-proyecto',
  templateUrl: './postulaciones-proyecto.component.html',
  styleUrls: ['./postulaciones-proyecto.component.scss']
})
export class PostulacionesProyectoComponent implements OnInit {
  proyectoId = 0;

  constructor() {}

  ngOnInit(): void {
    const params = history.state;
    this.proyectoId = params.id;
  }
}
