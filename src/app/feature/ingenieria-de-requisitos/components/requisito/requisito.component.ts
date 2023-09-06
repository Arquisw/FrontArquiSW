import { Component, OnInit, Input } from '@angular/core';
import { RequisitoResumen } from '../../shared/model/requisito-resumen.module';
import Modal from 'bootstrap/js/dist/modal';
import { FormControl, FormGroup } from '@angular/forms';
import { TipoRequisito } from '../../shared/model/tipo-requisito.module';
import { Requisito } from '../../shared/model/requisito.model';
import { IngenieriaDeRequisitosService } from '../../shared/service/ingenieria-de-requisitos.service';

@Component({
  selector: 'app-requisito',
  templateUrl: './requisito.component.html',
  styleUrls: ['./requisito.component.scss']
})
export class RequisitoComponent implements OnInit {
  @Input() requisito: RequisitoResumen;
  @Input() authorities: string[];
  puedeGestionarRequisito = false;
  actualizacionError = false;
  mensajeError = '';
  actualizarRequisitoModal: Modal | undefined;
  actualizarRequisitoForm: FormGroup;
  seleccionarMensaje = 'Seleccionar';

  constructor(private ingenieriaDeRequisitosService: IngenieriaDeRequisitosService) {}

  ngOnInit(): void {
    this.filtrarMenu();
    this.inicializarFormulario();
  }

  filtrarMenu(): void {
    this.authorities.forEach(authority => {
      if (authority === 'ROLE_EQUIPO_DESARROLLO') {
        this.puedeGestionarRequisito = true;
      }
    });
  }

  inicializarFormulario(): void {
    this.actualizarRequisitoForm = new FormGroup({
      nombreRequisitoActualizar: new FormControl(''),
      descripcionRequisitoActualizar: new FormControl(''),
      tipoRequisitoActualizar: new FormControl('')
    });
  }

  abrirModalActualizarRequisito(): void {
    this.actualizarRequisitoModal = new Modal(document.getElementById('actualizarRequisito') ?? false, {
      keyboard: false
    });

    this.actualizarRequisitoModal?.show();
  }

  actualizarRequisito(): void {
    const tipoRequisito = new TipoRequisito(this.actualizarRequisitoForm.get('tipoRequisitoActualizar')?.value);
    const requisito = new Requisito(this.actualizarRequisitoForm.get('nombreRequisitoActualizar')?.value, this.actualizarRequisitoForm.get('descripcionRequisitoActualizar')?.value, tipoRequisito);

    this.ingenieriaDeRequisitosService.actualizarRequisito(requisito, this.requisito?.id).subscribe(() => {
      this.actualizarRequisitoModal?.hide();
      window.location.reload();
    }, (error) => {
      this.actualizacionError = true;
      this.mensajeError = error?.error?.mensaje;
    });
  }

  eliminarRequisito(): void {
    this.ingenieriaDeRequisitosService.eliminarRequisito(this.requisito?.id).subscribe(() => {
      window.location.reload();
    });
  }
}
