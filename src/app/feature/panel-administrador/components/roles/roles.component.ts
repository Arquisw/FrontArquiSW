import { Component, OnInit } from '@angular/core';
import { RolResumen } from '../../shared/model/rol-resumen';
import Modal from 'bootstrap/js/dist/modal';
import { AdministradorService } from '../../shared/service/administrador.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {
  loginModal: Modal | undefined;
  rolesResumen: RolResumen[] = [];
  rolActual: RolResumen;
  actualizarActual = false;
  eliminarActual = false;
  escribirActual = false;
  leerActual = false;
  actualizacionError = false;
  mensajeError = false;

  constructor(private administradorService: AdministradorService) { }

  ngOnInit(): void {
    this.consultarRoles();
  }

  consultarRoles(): void {
    this.administradorService.consultarRoles().subscribe((response) => {
      this.rolesResumen = response;
    });
  }

  openActualizar(id: number): void {
    this.loginModal = new Modal(document.getElementById('updateRole') ?? false, {
      keyboard: false
    });

    this.loginModal?.show();

    console.log(id);
  }

  onVerdaderoActualizar(): void {
    this.actualizarActual = true;
  }

  onFalsoActualizar(): void {
    this.actualizarActual = false;
  }

  onVerdaderoEliminar(): void {
    this.eliminarActual = true;
  }

  onFalsoEliminar(): void {
    this.eliminarActual = false;
  }

  onVerdaderoEscribir(): void {
    this.escribirActual = true;
  }

  onFalsoEscribir(): void {
    this.escribirActual = false;
  }

  onVerdaderoLeer(): void {
    this.leerActual = true;
  }

  onFalsoLeer(): void {
    this.leerActual = false;
  }

  obtenerMarca(estado: boolean): string {
    if(estado) {
      return 'X';
    }

    return '';
  }

  onClickUpdateNeed(): void {

  }
}
