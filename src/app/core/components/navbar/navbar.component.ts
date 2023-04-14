import { Component, Input } from '@angular/core';
import { MenuItem } from '@core/modelo/menu-item';
import Modal from 'bootstrap/js/dist/modal';

@Component({
  selector: 'app-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.scss'],
})
export class NavbarComponent {
  @Input() items: MenuItem[];
  loginModal: Modal| undefined;

  constructor() { }

  open(): void {
    this.loginModal = new Modal(document.getElementById('loginModal') ?? false, {
      keyboard: false
    });
    this.loginModal?.show();
  }

  onLogin(): void {
  }

  onClickRegister(): void {
  }
}
