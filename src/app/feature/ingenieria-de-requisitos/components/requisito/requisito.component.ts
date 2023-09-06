import { Component, OnInit, Input } from '@angular/core';
import { RequisitoResumen } from '../../shared/model/requisito-resumen.module';

@Component({
  selector: 'app-requisito',
  templateUrl: './requisito.component.html',
  styleUrls: ['./requisito.component.scss']
})
export class RequisitoComponent implements OnInit {
  @Input() requisito: RequisitoResumen;

  constructor() {}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  actualizarRequisito(id: number): void {
    console.log(id);
  }

  eliminarRequisito(id: number): void {
    console.log(id);
  }
}
