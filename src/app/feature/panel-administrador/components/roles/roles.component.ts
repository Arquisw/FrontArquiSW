import { Component, OnInit } from '@angular/core';
import { RolResumen } from '../../shared/model/rol-resumen.model';
import Modal from 'bootstrap/js/dist/modal';
import { AdministradorService } from '../../shared/service/administrador.service';
import { Rol } from '../../shared/model/rol.model';
import { RolesService } from '@shared/service/roles/roles.service';

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
  estaCargandoActualizar = false;

  constructor(private administradorService: AdministradorService,
              private rolesService: RolesService) { }

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

    this.rolActual = this.rolesResumen.find(rol => rol.id === id);
    this.actualizarActual = this.rolActual.actualizar;
    this.eliminarActual = this.rolActual.eliminar;
    this.escribirActual = this.rolActual.escribir;
    this.leerActual = this.rolActual.leer;
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

  obtenerNombreDelRol(clave: string): string {
    return this.rolesService.obtenerNombreDelRol(clave);
  }

  obtenerMarca(estado: boolean): string {
    if(estado) {
      return 'X';
    }

    return '';
  }

  onClickUpdateNeed(): void {
    this.estaCargandoActualizar = true;
    const rol = new Rol(this.leerActual, this.escribirActual, this.actualizarActual, this.eliminarActual);

    this.administradorService.actualizarRol(rol, this.rolActual.id).subscribe(() => {
      this.loginModal?.hide();
      window.location.reload();
    }, (error) => {
      this.estaCargandoActualizar = false;
      this.actualizacionError = true;
      this.mensajeError = error?.error?.mensaje;
    });
  }
}
