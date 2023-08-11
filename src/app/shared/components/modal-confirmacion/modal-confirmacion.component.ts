import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-confirmacion',
  templateUrl: './modal-confirmacion.component.html',
  styleUrls: ['./modal-confirmacion.component.scss']
})
export class ModalConfirmacionComponent {
  @Output() confirmacion = new EventEmitter<void>();
  @Input() descripcion = '';
  @Input() titulo;
  
  confirmar() {
    this.confirmacion.emit();
  }

}
