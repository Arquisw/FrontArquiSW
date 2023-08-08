import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-modal-descripcion',
  templateUrl: './modal-descripcion.component.html',
  styleUrls: ['./modal-descripcion.component.scss']
})
export class ModalDescripcionComponent {
  @Input() descripcion: string;
}
