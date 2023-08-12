import { Component, EventEmitter, Input, Output } from '@angular/core';


@Component({
  selector: 'app-modal-confirmacion',
  templateUrl: './modal-confirmacion.component.html',
  styleUrls: ['./modal-confirmacion.component.scss']
})
export class ModalConfirmacionComponent {
  @Input() titulo;
  @Input() modalId: string;
  @Input() descripcion;
  @Output() confirmacion = new EventEmitter<void>();


  confirmar() {
    this.confirmacion.emit();
  }

}
