import { Component, EventEmitter, Input, Output} from '@angular/core';



@Component({
  selector: 'app-modal-rechazo',
  templateUrl: './modal-rechazo.component.html',
  styleUrls: ['./modal-rechazo.component.scss']
})
export class ModalRechazoComponent {
  @Input() modalIdRechazo: string;
  @Input() titulo;
  @Output() confirmacion = new EventEmitter<void>();
  motivo;

  confirmarRechazo() {
    this.confirmacion.emit(this.motivo)
  }
}


