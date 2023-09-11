import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RecuperarClaveService } from '../../shared/service/recuperar-clave.service';
import { Codigo } from '../../shared/model/codigo.model';
import { RecuperarClave } from '../../shared/model/recuperar-clave.model';
import { Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-recuperar-clave',
  templateUrl: './recuperar-clave.component.html',
  styleUrls: ['./recuperar-clave.component.scss']
})
export class RecuperarClaveComponent  implements OnInit {
  iniciarRecuperacionClaveForm: FormGroup;
  validarCodigoParaRecuperarClaveForm: FormGroup;
  recuperarClaveForm: FormGroup;
  iniciarRecuperacionClaveError = false;
  validarCodigoParaRecuperarClaveError = false;
  recuperarClaveError = false;
  codigoEnviado = false;
  codigoValido = false;
  estaCargandoIniciarRecuperacionClave = false;
  estaCargandoValidarCodigo = false;
  estaCargandoRecuperarClave = false;
  mensajeCodigoEnviado = '';
  mensajeCodigoValido = '';
  correo = '';
  mensajeError= '';

  constructor(private viewportScroller: ViewportScroller, private recuperarClaveService: RecuperarClaveService, private router: Router) {}

  ngOnInit(): void {
    this.viewportScroller.scrollToPosition([0, 0]);

    this.mensajeError = '';

    this.iniciarRecuperacionClaveForm = new FormGroup({
      correo: new FormControl('')
    });

    this.validarCodigoParaRecuperarClaveForm = new FormGroup({
      codigo: new FormControl('')
    });

    this.recuperarClaveForm = new FormGroup({
      contraseña: new FormControl(''),
      confirmarContraseña: new FormControl('')
    });
  }

  onClickIniciarRecuperacionClave(): void {
    this.estaCargandoIniciarRecuperacionClave = true;

    this.correo = this.iniciarRecuperacionClaveForm.get('correo')?.value;

    this.recuperarClaveService.iniciarRecuperacionDeLaClave(this.correo).subscribe(() => {
      this.estaCargandoIniciarRecuperacionClave = false;
      this.codigoEnviado = true;
      this.mensajeCodigoEnviado = 'Se ha enviado un codigo al correo: ' + this.correo;
    },
    (error) => {
      this.estaCargandoIniciarRecuperacionClave = false;
      this.iniciarRecuperacionClaveError = true;
      this.codigoEnviado = false;
      this.mensajeError = error?.error?.mensaje;
    });
  }

  onClickValidarCodigoParaRecuperarClave(): void {
    this.estaCargandoValidarCodigo = true;

    const codigo = new Codigo(this.validarCodigoParaRecuperarClaveForm.get('codigo')?.value);

    this.recuperarClaveService.validarCodigoParaRecuperarClave(codigo, this.correo).subscribe((response) => {
      console.log('Data:', response);
      this.estaCargandoValidarCodigo = false;
      this.codigoValido = response.valor;
      this.mensajeCodigoValido = '¡Codigo valido! Ahora asigna una nueva contraseña.';
    },
    (error) => {
      this.estaCargandoValidarCodigo = false;
      this.validarCodigoParaRecuperarClaveError = true;
      this.codigoValido = false;
      this.mensajeError = error?.error?.mensaje;
    });
  }

  onClickRecuperarClave(): void {
    this.estaCargandoRecuperarClave = true;

    const recuperarClave = new RecuperarClave(this.recuperarClaveForm.get('contraseña')?.value);
    const confirmarClave = this.recuperarClaveForm.get('confirmarContraseña')?.value;

    if(recuperarClave.clave === confirmarClave) {
      this.recuperarClaveService.recuperarClave(recuperarClave, this.correo).subscribe((response) => {
        console.log('Data:', response);
        this.router.navigate(['/inicio']);
      },
      (error) => {
        this.estaCargandoRecuperarClave = false;
        this.recuperarClaveError = true;
        this.mensajeError = error?.error?.mensaje;
      });
    } else {
      this.estaCargandoRecuperarClave = false;
      this.recuperarClaveError = true;
      this.mensajeError = 'Las contraseñas no coinciden';
    }
  }
}
