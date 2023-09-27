import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent {
  loginForm: FormGroup;
  loginError = false;
  mensajeError = '';
  estaCargandoLogin = false;

  onLogin(): void {

  }

  onRecuperarClave(): void {
    
  }
}
