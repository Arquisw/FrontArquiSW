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
  estaCargandoEliminacion = false;
  estaCargandoActualizacion = false;
  mensajeError = '';
  actualizarRequisitoModal: Modal | undefined;
  requisitoCompleto: Modal | undefined;
  actualizarRequisitoForm: FormGroup;
  seleccionarMensaje = 'Seleccionar';
  modalId: string;
  descripcionModalId: string;

  constructor(private ingenieriaDeRequisitosService: IngenieriaDeRequisitosService) {
    
  }

  ngOnInit(): void {
    this.filtrarMenu();
    this.inicializarFormulario();
    this.modalId = 'actualizarRequisitoModal_' + this.requisito?.id;
    this.descripcionModalId = 'descripcion' + this.requisito?.id;

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
    this.modalId = 'actualizarRequisitoModal_' + this.requisito?.id;
    const modalElement = document.getElementById(this.modalId);
    this.llenarForm()
    if (modalElement) {
      modalElement.classList.add('show'); 
    }
  }

  abrirModalRequisito(){
    this.descripcionModalId = 'descripcion' + this.requisito?.id;
    const modalElement = document.getElementById(this.descripcionModalId);
    if (modalElement) {
      modalElement.classList.add('show'); 
    }
  }

  private llenarForm(): void {
    this.actualizarRequisitoForm.patchValue({
      nombreRequisitoActualizar: this.requisito.nombre,
      descripcionRequisitoActualizar: this.requisito.descripcion,
      tipoRequisitoActualizar: this.requisito.tipoRequisito.nombre
    });
  }

  actualizarRequisito(): void {
    this.estaCargandoActualizacion = true;
    const tipoRequisito = new TipoRequisito(this.actualizarRequisitoForm.get('tipoRequisitoActualizar')?.value);
    const requisito = new Requisito(this.actualizarRequisitoForm.get('nombreRequisitoActualizar')?.value, this.actualizarRequisitoForm.get('descripcionRequisitoActualizar')?.value, tipoRequisito);

    this.ingenieriaDeRequisitosService.actualizarRequisito(requisito, this.requisito?.id).subscribe(() => {
      this.actualizarRequisitoModal?.hide();
      window.location.reload();
    }, (error) => {
      this.estaCargandoActualizacion = false;
      this.actualizacionError = true;
      this.mensajeError = error?.error?.mensaje;
    });
  }

  eliminarRequisito(): void {
    this.estaCargandoEliminacion = true;

    this.ingenieriaDeRequisitosService.eliminarRequisito(this.requisito?.id).subscribe(() => {
      window.location.reload();
    }, () => {
      this.estaCargandoEliminacion = false;
    });
  }
}
