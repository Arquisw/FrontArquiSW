import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivarCuentaService } from '../../shared/service/activar-cuenta.service';
import { ActivarCuenta } from '../../shared/model/activar-cuenta.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-activar-cuenta',
  templateUrl: './activar-cuenta.component.html',
  styleUrls: ['./activar-cuenta.component.scss']
})
export class ActivarCuentaComponent implements OnInit {
  correo = '';
  estaCargandoIniciarActivacionCuenta = false;
  IniciarActivacionCuentaError = false;
  mensajeError = '';
  codigoEnviado = false;
  codigoValido = false;
  estaCargandoActivarCuenta = false;
  activarCuentaError = false;
  activarCuentaForm: FormGroup;
  mensajeCodigoEnviado = '';

  constructor(private activarCuentaService: ActivarCuentaService, private router: Router) {}

  ngOnInit(): void {
    const token = window.sessionStorage.getItem('Authorization');
    const tokenPayload = JSON.parse(atob(token.split('.')[1]));

    this.correo = tokenPayload.username;

    this.activarCuentaForm = new FormGroup({
      codigoActivarCuenta: new FormControl('')
    });
  }

  onClickIniciarActivacionCuenta(): void {
    this.estaCargandoIniciarActivacionCuenta = true;

    this.activarCuentaService.iniciarActivacionCuenta(this.correo).subscribe(() => {
      this.estaCargandoIniciarActivacionCuenta = false;
      this.codigoEnviado = true;
      this.mensajeCodigoEnviado = 'Se ha enviado un código al correo: ' + this.correo;
    },
    (error) => {
      this.estaCargandoIniciarActivacionCuenta = false;
      this.IniciarActivacionCuentaError = true;
      this.codigoEnviado = false;
      this.mensajeError = error?.error?.mensaje;
    });
  }

  onClickActivarCuenta(): void {
    this.estaCargandoActivarCuenta = true;

    const activarCuenta = new ActivarCuenta(this.activarCuentaForm.get('codigoActivarCuenta')?.value);

    this.activarCuentaService.activarCuenta(activarCuenta, this.correo).subscribe(() => {
      this.estaCargandoActivarCuenta = false;

      this.abrirInicio();
    },
    (error) => {
      this.estaCargandoActivarCuenta = false;
      this.activarCuentaError = true;
      this.codigoValido = false;
      this.mensajeError = error?.error?.mensaje;
    });
  }

  abrirInicio(): void {
    this.router.navigate(['/inicio']).then(() => {
      window.location.reload();
    });
  }
}
